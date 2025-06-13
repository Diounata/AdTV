from flask import Blueprint, jsonify, request, g
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from features.auth.utils import require_admin
from models.user import User
from extensions import db
from functools import wraps
import jwt
import os

users_bp = Blueprint('user_auth', __name__, url_prefix='/auth')

def require_authentication(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Authorization token missing or invalid'}), 401

        token = auth_header.split()[1]

        try:
            g.token_payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)
    return decorated_function

#Listar usuários
@users_bp.route('/users', methods=['GET'])
@require_admin
def get_users():
    users = User.query.all()
    return jsonify({"users": [user.to_dict() for user in users]}), 200

# Criar usuários
@users_bp.route('/users', methods=['POST'])
@require_admin
def create_user():
    data = request.get_json()
    required_fields = ['name', 'email', 'type', 'password']
    
    if not data or any(not data.get(field) for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already in use'}), 409

    if data['type'] not in ['ADMIN', 'DEFAULT']:
        return jsonify({'error': 'Invalid user type. Must be ADMIN or DEFAULT'}), 400

    user = User(
        name=data['name'],
        email=data['email'],
        type=data['type'],
        hashed_password=generate_password_hash(data['password'])
    )
    
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': 'User created successfully'}), 201

# Atualizar usuários
@users_bp.route('/users', methods=['PUT'])
@require_authentication
def update_user():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    user = User.query.get(g.token_payload.get('sub'))
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    if 'name' in data:
        user.name = data['name']
    
    if 'email' in data and data['email'] != user.email:
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already in use'}), 409
        user.email = data['email']
    
    if 'password' in data:
        user.hashed_password = generate_password_hash(data['password'])
    
    if 'type' in data:
        if data['type'] not in ['ADMIN', 'DEFAULT']:
            return jsonify({'error': 'Invalid user type'}), 400
        user.type = data['type']
    
    db.session.commit()
    return jsonify({
        'success': 'User updated successfully',
        'user': user.to_dict()
    }), 200

# Atualizar senha de usuário
@users_bp.route('/users/password', methods=['PUT'])
@require_authentication
def update_password():
    data = request.get_json()
    
    if not data or not data.get('current_password') or not data.get('new_password'):
        return jsonify({"error": "Both current and new password are required"}), 400

    user = User.query.get(g.token_payload.get('sub'))
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user.hashed_password, data['current_password']):
        return jsonify({"error": "Current password is incorrect"}), 401

    user.hashed_password = generate_password_hash(data['new_password'])
    db.session.commit()
    return jsonify({"success": "Password updated successfully"}), 200

# Buscar dados de usuário autenticado
@users_bp.route('/me', methods=['GET'])
@require_authentication
def get_authenticated_user():
    user_id = g.token_payload.get('sub')
    
    if not user_id:
        return jsonify({'error': 'Invalid token payload'}), 401
    
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user': {
            'id': str(user.id),
            'name': user.name,
            'email': user.email,
            'type': user.type,
            'createdAt': user.created_at.isoformat() if user.created_at else None,
            'updatedAt': user.updated_at.isoformat() if user.updated_at else None
        }
    }), 200