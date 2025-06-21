from flask import Blueprint, jsonify, request, g
from datetime import datetime, timezone
from features.auth.utils import require_authentication
from models.sector import Sector
from extensions import db


sectors_bp = Blueprint('sectors', __name__, url_prefix='/sectors')


@sectors_bp.route('/', methods=['GET'])
@require_authentication
def get_sectors():
    sectors = Sector.query.all()
    sectors_data = [sector.to_dict() for sector in sectors]
    return jsonify({'sectors': sectors_data})


@sectors_bp.route('/', methods=['POST'])
@require_authentication
def create_sector():
    data = request.get_json()
 
    if not data or not data.get('name') or not data.get('slug'):
        return jsonify({'error': "Fields 'name' and 'slug' are required."}), 400

    name = data.get('name')
    slug = data.get('slug')

    if Sector.query.filter_by(slug=slug).first():
        return jsonify({"error": "Sector with this slug already exists"}), 409

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
        return jsonify({'error': 'Slug already used by another sector'}), 409

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
    
    try:
        db.session.delete(sector)
        db.session.commit()
        return jsonify({'success': 'Sector deleted succesfully'}), 200
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
      