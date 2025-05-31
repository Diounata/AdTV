from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from features.auth.utils import protected_route
from models.user import User
from extensions import db

users_bp = Blueprint('users', __name__, url_prefix='/users')


@users_bp.route('/', methods=['GET'])
@protected_route
def get_users():
    users = User.query.all()
    users_data = [user.to_dict() for user in users]
    return jsonify({'users': users_data})


@users_bp.route('/', methods=['POST'])
@protected_route
def create_user():
    data = request.get_json()

    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    emailEstaSendoUsado = User.query.filter_by(email=email).first() is not None

    if emailEstaSendoUsado:
        return jsonify({'error': 'Email already in use'}), 400

    user = User(
        name=name,
        email=email,
        hashed_password=generate_password_hash(password),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': 'User created successfully'}), 201
