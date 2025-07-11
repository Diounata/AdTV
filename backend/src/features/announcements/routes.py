from flask import Blueprint, jsonify, request, send_from_directory
from features.auth.utils import require_authentication
from models.announcement import Announcement
from extensions import db
from flask import g
import json
from uuid import uuid4
from flask import current_app
from werkzeug.exceptions import NotFound
import os
from werkzeug.utils import secure_filename

announcements_bp = Blueprint(
    'announcements', __name__, url_prefix='/announcements')


@announcements_bp.route('/', methods=['GET'])
@require_authentication
def list_announcements():
    announcements = Announcement.query.all()
    result = [announcements.to_dict() for announcements in announcements]
    return jsonify(result)


@announcements_bp.route('/<string:announcement_id>', methods=['GET'])
@require_authentication
def get_announcement(announcement_id):
    announcement = Announcement.query.get_or_404(announcement_id)
    if hasattr(announcement, 'deleted') and announcement.deleted:
        return jsonify({'error': 'Announcement not found'}), 404
    return jsonify(announcement.to_dict())


@announcements_bp.route('/uploads/<string:media_filename>', methods=['GET'])
def serve_image(media_filename):
    uploads_dir = os.path.join(current_app.root_path, '..', 'uploads')
    uploads_dir = os.path.abspath(uploads_dir)
    file_path = os.path.join(uploads_dir, media_filename)

    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    return send_from_directory(uploads_dir, media_filename)


@announcements_bp.route('/', methods=['POST'])
@require_authentication
def create_announcement():
    file = request.files.get('file')
    metadata_json = request.form.get('metadata')

    if not file or not metadata_json:
        return 'Missing file or metadata', 400

    try:
        metadata = json.loads(metadata_json)
    except json.JSONDecodeError:
        return 'Invalid JSON', 400

    ext = os.path.splitext(secure_filename(file.filename))[1]
    filename = f"{uuid4().hex}{ext}"
    file_path = os.path.join('uploads', filename)
    file.save(file_path)

    announcement = Announcement(
        name=metadata.get('name', 'Sem título'),
        media_filename=filename,
        created_by=g.token_payload['sub']
    )

    db.session.add(announcement)
    db.session.commit()

    return jsonify({
        'message': 'Upload successful',
        'file': filename,
        'metadata': metadata
    })


@announcements_bp.route('/<string:announcement_id>', methods=['PUT', 'OPTIONS'])
@require_authentication
def edit_announcement(announcement_id):
    announcement = Announcement.query.get_or_404(announcement_id)
    if hasattr(announcement, 'deleted') and announcement.deleted:
        return jsonify({'error': 'Announcement not found'}), 404

    file = request.files.get('file')
    metadata_json = request.form.get('metadata')
    try:
        metadata = json.loads(metadata_json) if metadata_json else {}
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON'}), 400
    name = metadata.get('name', announcement.name)

    if not name:
        return jsonify({'error': 'No data provided'}), 400

    if name:
        announcement.name = name

    if file:
        ext = os.path.splitext(secure_filename(file.filename))[1]
        filename = f"{uuid4().hex}{ext}"
        file_path = os.path.join('uploads', filename)
        file.save(file_path)
        announcement.media_filename = filename

    db.session.commit()
    return jsonify({'message': 'Announcement updated successfully'})


@announcements_bp.route('/<string:announcement_id>', methods=['DELETE'])
@require_authentication
def delete_announcement(announcement_id):
    announcement = Announcement.query.get_or_404(announcement_id)
    if hasattr(announcement, 'deleted'):
        announcement.deleted_at = db.func.now()
    else:
        db.session.delete(announcement)
        db.session.commit()
        return jsonify({'message': 'Announcement deleted (hard delete)'})

    db.session.commit()
    return jsonify({'message': 'Announcement deleted (soft delete)'})
