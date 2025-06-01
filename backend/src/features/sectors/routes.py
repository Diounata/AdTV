from flask import Blueprint, jsonify, request
from features.auth.utils import require_authentication
from models.sector import Sector
from extensions import db
from flask import g

sectors_bp = Blueprint('sectors', __name__, url_prefix='/sectors')


@sectors_bp.route('/', methods=['POST'])
@require_authentication
def create_sector():
    data = request.get_json()
    if not data or 'name' not in data or 'slug' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    name = data.get('name')
    slug = data.get('slug')
    created_by = g.token_payload['sub']

    sector = Sector(name=name, slug=slug, created_by=created_by)
    db.session.add(sector)
    db.session.commit()

    return jsonify({'success': 'Sector created successfully', 'sector_id': sector.id}), 201
