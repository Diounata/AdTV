from functools import wraps
from flask import redirect, request, current_app, g
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from features.auth.utils import _get_token


def _decode_token(token):
    try:
        return jwt.decode(
            token,
            current_app.config['JWT_SECRET_KEY'],
            algorithms=['HS256']
        )
    except (ExpiredSignatureError, InvalidTokenError):
        return None


def private_route(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == "OPTIONS":
            return '', 204

        token = _get_token()
        payload = _decode_token(token) if token else None

        if not payload:
            return redirect('/')

        g.token_payload = payload
        return f(*args, **kwargs)

    return decorated


def public_route(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == "OPTIONS":
            return '', 204

        token = _get_token()
        payload = _decode_token(token) if token else None

        if payload:
            return redirect('/dashboard')

        return f(*args, **kwargs)

    return decorated
