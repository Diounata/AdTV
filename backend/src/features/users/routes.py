from flask import Blueprint, jsonify, request, g
from werkzeug.security import generate_password_hash
from datetime import datetime
from features.auth.utils import require_admin
from models.user import User
from extensions import db

users_bp = Blueprint('users', __name__, url_prefix='/users')

# Listar usuários
@users_bp.route('/', methods=['GET'])
@require_admin
def get_users():
    users = User.query.all()
    users_data = [user.to_dict() for user in users]
    return jsonify({"users": users_data}), 200

# Criar usuários
@users_bp.route('/', methods=['POST'])
@require_admin
def create_user():
    data = request.get_json()

    required_fields = ['name', 'email', 'type', 'password']
    if not data or any(not data.get(field) for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    name = data.get('name')
    email = data.get('email')
    type = data.get('type')
    password = data.get('password')
    
    valid_types = ['ADMIN', 'DEFAULT']
    if type not in valid_types:
        return jsonify({'error': f'Invalid user type. Must be one of: {", ".join(valid_types)}'}), 400

    isEmailBeingUsed = User.query.filter_by(email=email).first() is not None

    if isEmailBeingUsed:
        return jsonify({'error': 'Email already in use'}), 400

    user = User(
        name=name,
        email=email,
        type=type,
        hashed_password=generate_password_hash(password),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': 'User created successfully'}), 201

# Atualizar usuário
@users_bp.route('/', methods=['PUT'])
@require_admin
def update_user():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    user_id = g.token_payload.get('sub')
    
    if not user_id:
        return jsonify({'error': 'Invalid token payload'}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    if 'name' in data:
        user.name = data['name']
    
    if 'email' in data:
        new_email = data['email']
        if new_email != user.email and User.query.filter_by(email=new_email).first() is not None:
            return jsonify({'error': 'Email already in use'}), 409
        user.email = new_email
    
    if 'password' in data:
        user.hashed_password = generate_password_hash(data['password'])
    
    if 'type' in data:
        valid_types = ['ADMIN', 'DEFAULT']
        if data['type'] not in valid_types:
            return jsonify({'error': f'Invalid user type. Must be one of: {", ".join(valid_types)}'}), 400
        user.type = data['type']
    
    db.session.commit()
    
    return jsonify({
        'success': 'User updated successfully',
        'user': user.to_dict()
    }), 200