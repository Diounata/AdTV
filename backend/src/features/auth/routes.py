from flask import Blueprint, request, jsonify, make_response
from .services import generate_token, verify_user_password
from models.user import User



auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return make_response({'error': 'Missing credentials'}, 400)

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user:
        return make_response({'error': 'User not found'}, 404)

    if verify_user_password(hashed_password=user.hashed_password, password=password):
        token = generate_token(user_id=user.id, user_type=user.type)
        return jsonify({'accessToken': token})
    return make_response({'error': 'Invalid credentials'}, 401, {'WWW-Authenticate': 'Basic realm="Login required"'})
