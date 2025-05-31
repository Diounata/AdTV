from functools import wraps
from flask import request, jsonify, current_app
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError


def protected_route(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token is missing or invalid'}), 401

        token = auth_header.split(' ')[1]
        try:
            jwt.decode(
                token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        except ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(*args, **kwargs)
    return decorated
