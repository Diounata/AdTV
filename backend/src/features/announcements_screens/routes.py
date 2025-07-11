from flask import Blueprint, jsonify, request, make_response
from models.screen import Screen
from features.auth.utils import require_authentication
from extensions import db
from models.announcemnet_screen import AnnouncementScreen

announcements_screens_bp = Blueprint(
    'announcements_screens', __name__, url_prefix='/announcements_screens')


@announcements_screens_bp.route('/', methods=['GET'])
@require_authentication
def get_all_announcement_screens():
    announcement_screens = AnnouncementScreen.query.all()
    result = [
        {
            'id': ascreen.id,
            'announcement_id': ascreen.announcement_id,
            'screen_id': ascreen.screen_id
        }
        for ascreen in announcement_screens
    ]
    return jsonify(result), 200


@announcements_screens_bp.route('/screen/<string:screen_id>', methods=['GET'])
def get_screen_announcements(screen_id):
    announcement_screens = AnnouncementScreen.query.filter_by(screen_id=screen_id).all()
    announcements = [ascreen.announcement.to_dict() for ascreen in announcement_screens if hasattr(ascreen, 'announcement') and ascreen.announcement]
    return jsonify(announcements), 200


@announcements_screens_bp.route('/announcement/<string:announcement_id>', methods=['GET'])
@require_authentication
def get_announcement_screens(announcement_id):
    announcement_screens = AnnouncementScreen.query.filter_by(announcement_id=announcement_id).all()
    screens = [ascreen.screen.to_dict() for ascreen in announcement_screens if hasattr(
        ascreen, 'screen') and ascreen.screen]
    return jsonify(screens), 200


@announcements_screens_bp.route('/link/<string:announcement_id>', methods=['POST', 'OPTIONS'])
@require_authentication
def link_announcement_to_screens(announcement_id):
    data = request.get_json()
    if not data or 'screensId' not in data:
        return make_response(jsonify({'error': 'Invalid input'}), 400)

    screens_id = data['screensId']

    for screen_id in screens_id:
        screen = Screen.query.get(screen_id)
        if not screen:
            return make_response(jsonify({'error': f'Screen with id {screen_id} not found'}), 404)
        announcement_screen = AnnouncementScreen.query.filter_by(
            announcement_id=announcement_id, screen_id=screen_id).first()
        if announcement_screen:
            continue
        announcement_screen = AnnouncementScreen(
            announcement_id=announcement_id,
            screen_id=screen_id
        )
        db.session.add(announcement_screen)

    db.session.commit()
    return jsonify({'message': 'Announcement linked to screens successfully'}), 201


@announcements_screens_bp.route('/unlink/<string:announcement_id>', methods=['POST'])
@require_authentication
def unlink_announcement_from_screens(announcement_id):
    data = request.get_json()
    if not data or 'screensId' not in data:
        return make_response(jsonify({'error': 'Invalid input'}), 400)

    screens_id = data['screensId']

    for screen_id in screens_id:
        announcement_screen = AnnouncementScreen.query.filter_by(
            announcement_id=announcement_id, screen_id=screen_id).first()
        if not announcement_screen:
            continue
        db.session.delete(announcement_screen)

    db.session.commit()
    return jsonify({'message': 'Announcement unlinked from screens successfully'}), 200
