from flask import Blueprint, jsonify, request
from features.auth.utils import require_authentication
from models.screen import Screen
from extensions import db
from flask import g

screens_bp = Blueprint('screens', __name__, url_prefix='/screens')


@screens_bp.route('/', methods=['POST'])
@require_authentication
def create_screen():
    return
