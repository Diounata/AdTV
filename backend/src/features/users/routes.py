from flask import Blueprint, jsonify, request, g
from werkzeug.security import generate_password_hash, check_password_hash
from features.auth.utils import require_admin, require_authentication
from models.user import User
from extensions import db

users_bp = Blueprint('users', __name__, url_prefix='/users')


@users_bp.route('/', methods=['GET'])
@require_admin
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    pagination = User.query.order_by(User.name.asc()).paginate(
        page=page, per_page=per_page, error_out=False)
    users_data = [user.to_dict() for user in pagination.items]
    return jsonify({
        "page": pagination.page,
        "itemsPerPage": pagination.per_page,
        "items": users_data,
        "totalItems": pagination.total,
        "totalPages": pagination.pages
    }), 200


@users_bp.route('', methods=['POST', 'OPTIONS'])
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
        return jsonify({'code': 'email-being-used', 'message': 'Email already in use'}), 409

    user = User(
        name=name,
        email=email,
        type=type,
        hashed_password=generate_password_hash(password),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': 'User created successfully'}), 201


@users_bp.route('/', methods=['PUT'])
@require_authentication
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

    db.session.commit()

    return jsonify({
        'success': 'User updated successfully',
        'user': user.to_dict()
    }), 200


@users_bp.route('/password', methods=['PUT'])
@require_admin
def update_password():
    data = request.get_json()

    if not data or not data.get('currentPassword') or not data.get('newPassword'):
        return jsonify({"error": "currentPassword and newPassword are required"}), 400

    user_id = g.token_payload.get('sub')
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user.hashed_password, data['currentPassword']):
        return jsonify({'code': 'invalid-credentials', 'message': 'Invalid credentials'}), 401

    user.hashed_password = generate_password_hash(data['newPassword'])
    db.session.commit()

    return jsonify({"success": "Password updated"}), 200


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


@users_bp.route('/type', methods=['PUT', 'OPTIONS'])
@require_admin
def update_user_type():
    data = request.get_json()
    if not data or not data.get('userId') or not data.get('type'):
        return jsonify({'error': 'userId and type are required'}), 400

    user_id = data.get('userId')
    new_type = data.get('type')
    valid_types = ['ADMIN', 'DEFAULT']

    if new_type not in valid_types:
        return jsonify({'error': f'Invalid user type. Must be one of: {", ".join(valid_types)}'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.type = new_type
    db.session.commit()

    return jsonify({'success': 'User type updated successfully'}), 200
