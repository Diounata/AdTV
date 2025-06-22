from flask import Blueprint, request, make_response
from .services import generate_token, verify_user_password
from models.user import User
from datetime import datetime, timedelta


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
        response = make_response({'accessToken': token})
        expires = datetime.utcnow() + timedelta(days=1)
        response.set_cookie(
            'accessToken',
            f"Bearer {token}",
            expires=expires,
            httponly=True,
            secure=True
        )
        return response
    return make_response({'code': 'invalid-credentials', 'message': 'Invalid credentials'}, 401)


@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = make_response({'message': 'Logged out successfully'})
    response.set_cookie(
        'accessToken', '',
        expires=0,
        httponly=True, secure=True)
    return response
