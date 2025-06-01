from functools import wraps
from flask import request, jsonify, current_app
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from flask import g


def require_authentication(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token is missing or invalid'}), 401

        try:
            token = auth_header.split(' ')[1].strip()
            payload = jwt.decode(
                token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            g.token_payload = payload
        except ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(*args, **kwargs)
    return decorated


def require_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token is missing or invalid'}), 401

        try:
            token = auth_header.split(' ')[1].strip()
            payload = jwt.decode(
                token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            if payload.get('type') != 'ADMIN':
                return jsonify({'message': 'Admin access required'}), 403
            g.token_payload = payload
        except ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except InvalidTokenError as e:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(*args, **kwargs)
    return decorated
