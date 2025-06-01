from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from features.auth.utils import require_admin
from models.user import User
from extensions import db

users_bp = Blueprint('users', __name__, url_prefix='/users')


@users_bp.route('/', methods=['GET'])
@require_admin
def get_users():
    users = User.query.all()
    users_data = [user.to_dict() for user in users]
    return jsonify({'users': users_data})


@users_bp.route('/', methods=['POST'])
@require_admin
def create_user():
    data = request.get_json()

    if not data or not data.get('name') or not data.get('email') or not data.get('type') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400

    name = data.get('name')
    email = data.get('email')
    type = data.get('type')
    password = data.get('password')

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
