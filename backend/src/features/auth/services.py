import jwt
import datetime
from flask import current_app
from werkzeug.security import check_password_hash


def generate_token(user_id, user_type):
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({
        'exp': exp,
        'sub': str(user_id),
        'type': user_type,
    }, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')
    return token if isinstance(token, str) else token.decode('utf-8')


def verify_user_password(hashed_password, password):
    return check_password_hash(hashed_password, password)
