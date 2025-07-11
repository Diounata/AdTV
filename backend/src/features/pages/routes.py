import os
from flask import Blueprint, current_app, send_from_directory
from features.pages.utils import public_route, private_route

pages_bp = Blueprint('pages', __name__, url_prefix='/')


@pages_bp.route('/')
@public_route
def serve_index():
    return send_from_directory(current_app.static_folder, 'index.html')


def _serve_dashboard_path(path=''):
    base_dir = os.path.join(current_app.static_folder, 'dashboard')
    file_path = os.path.join(base_dir, path)
    if os.path.isfile(file_path): return send_from_directory(base_dir, path)
    index_file = os.path.join(file_path, 'index.html')
    if os.path.isfile(index_file): return send_from_directory(file_path, 'index.html')
    return send_from_directory(base_dir, 'index.html')


@pages_bp.route('/dashboard/', methods=['GET'])
@private_route
def dashboard_index():
    return _serve_dashboard_path()


@pages_bp.route('/dashboard/<path:path>')
@private_route
def serve_dashboard(path):
    return _serve_dashboard_path(path)
