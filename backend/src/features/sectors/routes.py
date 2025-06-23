from flask import Blueprint, jsonify, request, g
from datetime import datetime, timezone
from features.auth.utils import require_authentication
from models.sector import Sector
from extensions import db
from sqlalchemy.orm import joinedload


sectors_bp = Blueprint('sectors', __name__, url_prefix='/sectors')


@sectors_bp.route('/', methods=['GET'])
@require_authentication
def get_sectors():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    pagination = Sector.query.filter(Sector.deleted_at == None).order_by(Sector.name.asc()).paginate(
        page=page, per_page=per_page, error_out=False)
    sectors_data = []
    sectors = Sector.query.options(joinedload(Sector.screens)).filter(Sector.deleted_at == None).order_by(Sector.name.asc()).paginate(
        page=page, per_page=per_page, error_out=False)
    for sector in sectors.items:
        sector_dict = sector.to_dict()
        sector_dict['screensCount'] = len(
            sector.screens) if hasattr(sector, 'screens') else 0
        sectors_data.append(sector_dict)
    return jsonify({
        "page": pagination.page,
        "itemsPerPage": pagination.per_page,
        "items": sectors_data,
        "totalItems": pagination.total,
        "totalPages": pagination.pages,
    }), 200


@sectors_bp.route('', methods=['POST'])
@require_authentication
def create_sector():
    data = request.get_json()

    if not data or not data.get('name') or not data.get('slug'):
        return jsonify({'error': "Fields 'name' and 'slug' are required."}), 400

    name = data.get('name')
    slug = data.get('slug')

    if Sector.query.filter_by(slug=slug).first():
        return jsonify({"code": "slug-being-used", "message": "Sector with this slug already exists"}), 409

    user_id = g.token_payload['sub']
    created_at = datetime.now(timezone.utc)

    sector = Sector(
        name=name,
        slug=slug,
        created_by=user_id,
        created_at=created_at
    )

    db.session.add(sector)
    db.session.commit()

    return jsonify({'success': 'Sector created successfully', 'sector_id': sector.id}), 201


@sectors_bp.route('/<string:sector_id>', methods=['PUT'])
@require_authentication
def update_sector(sector_id):
    data = request.get_json()

    if not data or not data.get('name') or not data.get('slug'):
        return jsonify({'error': "Fields 'name' and 'slug' are required."}), 400

    sector = Sector.query.get(sector_id)
    if not sector:
        return jsonify({'error': 'Sector not found'}), 404

    existing_slug = Sector.query.filter_by(slug=data['slug']).first()
    if existing_slug and existing_slug.id != sector_id:
        return jsonify({"code": "slug-being-used", "message": "Sector with this slug already exists"}), 409

    sector.name = data['name']
    sector.slug = data['slug']

    sector.updated_by = g.token_payload.get('sub')
    sector.updated_at = datetime.now(timezone.utc)

    db.session.commit()

    return jsonify({'success': 'Sector updated successfully'}), 200


@sectors_bp.route('/<string:sector_id>', methods=['DELETE'])
@require_authentication
def delete_sector(sector_id):
    sector = Sector.query.get(sector_id)

    if not sector:
        return jsonify({'error': 'Sector not found'}), 404

    if sector.deleted_at is not None:
        return jsonify({'error': 'Sector already deleted'}), 400

    try:
        sector.slug = sector.slug + '-deleted-' + \
            datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')
        sector.deleted_at = datetime.now(timezone.utc)
        sector.deleted_by = g.token_payload.get('sub')
        db.session.commit()
        return jsonify({'success': 'Sector deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error deleting sector: {str(e)}'}), 400


@sectors_bp.route('/<string:sector_id>', methods=['GET'])
@require_authentication
def get_sector(sector_id):
    try:
        sector = Sector.query.get(sector_id)

        if not sector:
            return jsonify({'error:' 'Sector not found'}), 404

        return jsonify({'sector': sector.to_dict()}), 200

    except Exception as e:
        return jsonify({'error': f'Error fetching sector: {str(e)}'}), 400
