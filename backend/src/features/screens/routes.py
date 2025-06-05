from flask import Blueprint, jsonify, request, make_response
from features.auth.utils import require_authentication
from models.screen import Screen
from extensions import db
from flask import g
from models.sector import Sector

screens_bp = Blueprint('screens', __name__, url_prefix='/screens')


@screens_bp.route('/', methods=['POST'])
@require_authentication
def create_screen():
    new_screen = request.get_json()
    required_fields = ['name', 'slug', 'sector_id'] 
    if not new_screen or not all(field in new_screen for field in required_fields):
        return jsonify({'error': 'invalid input'}), 400
    
    name = new_screen.get('name')
    slug = new_screen.get('slug')
    sector_id = new_screen.get('sector_id')
    
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
