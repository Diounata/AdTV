from flask import Blueprint, jsonify, request, make_response
from features.auth.utils import require_authentication
from models.screen import Screen
from extensions import db
from flask import g
from models.sector import Sector
from datetime import datetime, timezone

screens_bp = Blueprint('screens', __name__, url_prefix='/screens')


@screens_bp.route('', methods=['POST', 'OPTIONS'])
@require_authentication
def create_screen():
    new_screen = request.get_json()
    required_fields = ['name', 'slug', 'sectorId']
    if not new_screen or not all(field in new_screen for field in required_fields):
        return jsonify({'error': 'invalid input'}), 400

    name = new_screen.get('name')
    slug = new_screen.get('slug')
    sector_id = new_screen.get('sectorId')

    created_by = g.token_payload['sub']

    existing_slug = Screen.query.filter_by(slug=slug).first()
    if existing_slug:
        return jsonify({'error': 'Slug already exists'}), 409

    sector_exists = Sector.query.filter_by(id=sector_id).first()
    if not sector_exists:
        return make_response({'error': 'Sector not found'}, 404)

    screen = Screen(
        name=name,
        slug=slug,
        sector_id=sector_id,
        created_by=created_by
    )

    db.session.add(screen)
    db.session.commit()
    return jsonify({
        'success': 'Screen created successfully',
        'screen_id': screen.id
    }), 201


@screens_bp.route('/', methods=['GET'])
@require_authentication
def list_screen():
    page = request.args.get('page', 1, type=int)
    per_page = 10

    screens_query = Screen.query.join(Sector).filter(
        Sector.deleted_at == None, Screen.deleted_at == None
    ).order_by(Sector.name.asc(), Screen.name.asc())

    pagination = screens_query.paginate(
        page=page, per_page=per_page, error_out=False)

    screens_data = []
    for screen in pagination.items:
        sector = Sector.query.filter_by(id=screen.sector_id).first()
        screens_data.append({
            "id": screen.id,
            "name": screen.name,
            "slug": screen.slug,
            "lastDeviceSeenAt": screen.last_device_seen_at if screen.last_device_seen_at else None,
            "sectorId": screen.sector_id,
            "sectorName": sector.name if sector else None,
            "sectorSlug": sector.slug if sector else None,
            "createdAt": screen.created_at,
            "updatedAt": screen.updated_at,
        })

    return jsonify({
        "page": pagination.page,
        "itemsPerPage": pagination.per_page,
        "items": screens_data,
        "totalItems": pagination.total,
        "totalPages": pagination.pages,
    }), 200


@screens_bp.route('/<screen_id>', methods=['GET'])
@require_authentication
def screen_search(screen_id):
    try:
        screen = Screen.query.filter_by(id=screen_id).first()
        if not screen:
            return jsonify({'error': 'Screen not found'}), 404

        return jsonify({
            "id": screen.id,
            "name": screen.name,
            "slug": screen.slug,
            "sectorId": screen.sector_id,
            "createdAt": screen.created_at,
            "createdBy": screen.created_by,
            "updatedAt": screen.updated_at,
            "updatedBy": screen.updated_by
        }), 200

    except:
        return jsonify({"error": "Invalid screen ID"}), 400


@screens_bp.route('/<screen_id>', methods=['PUT'])
@require_authentication
def edit_screen(screen_id):
    update_data = request.get_json()

    if not update_data:
        return jsonify({'error': 'No data to update'}), 400

    screen = Screen.query.filter_by(id=screen_id).first()

    if not screen:
        return jsonify({'error': 'Screen not found'}), 404

    name = update_data.get('name')
    slug = update_data.get('slug')
    sector_id = update_data.get('sectorId')

    if not all([name, slug, sector_id]):
        return jsonify({'error': 'Missing fields in request body'}), 400

    existing_slug = Screen.query.filter(
        Screen.slug == slug,
        Screen.id != screen_id
    ).first()
    if existing_slug:
        return jsonify({'error': 'Slug already exists'}), 409

    sector_exists = Sector.query.filter_by(id=sector_id).first()
    if not sector_exists:
        return jsonify({'error': 'Sector not found'}), 404

    screen.name = name
    screen.slug = slug
    screen.sector_id = sector_id
    screen.updated_at = datetime.now(timezone.utc)
    screen.updated_by = g.token_payload.get('sub')

    db.session.commit()
    return jsonify({'success': 'Screen updated successfully',
                    'screen': {
                        'name': screen.name,
                        'slug': screen.slug,
                        'sector_id': screen.sector_id,
                    }
                    }), 200


@screens_bp.route('/<screen_id>', methods=['DELETE'])
@require_authentication
def delete_screen(screen_id):
    screen = Screen.query.get(screen_id)

    if not screen:
        return jsonify({'error': 'Screen not found'}), 404

    if screen.deleted_at is not None:
        return jsonify({'error': 'Screen already deleted'}), 400

    try:
        screen.slug = screen.slug + '-deleted-' + \
            datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')
        screen.deleted_at = datetime.now(timezone.utc)
        screen.deleted_by = g.token_payload.get('sub')
        db.session.commit()
        return jsonify({'success': 'Screen deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error deleting screen: {str(e)}'}), 400


@screens_bp.route('/<screen_id>/last-device-seen-at', methods=['PATCH'])
@require_authentication
def update_screen_last_device_seen(screen_id):
    data = request.get_json()
    last_device_seen_at = data.get('lastDeviceSeenAt')

    if not last_device_seen_at:
        return jsonify({'error': 'lastDeviceSeenAt is required'}), 400

    screen = Screen.query.get(screen_id)
    if not screen:
        return jsonify({'error': 'Screen not found'}), 404

    try:
        screen.last_device_seen_at = datetime.fromisoformat(
            last_device_seen_at)
    except Exception:
        return jsonify({'error': 'Invalid date format for lastDeviceSeenAt'}), 400
    db.session.commit()

    return jsonify({'success': 'Screen lastDeviceSeenAt updated successfully'}), 200
