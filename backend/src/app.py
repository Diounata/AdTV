import os
from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db
from models.user import User
from models.screen import Screen
from models.sector import Sector
from models.announcement import Announcement
from features.auth.routes import auth_bp
from features.announcements.routes import announcements_bp
from features.screens.routes import screens_bp
from features.sectors.routes import sectors_bp
from features.users.routes import users_bp


def create_app():
    app = Flask(__name__)
    CORS(
        app,
        supports_credentials=True,
        origins="*",
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
    app.config.from_object(Config)
    app.register_blueprint(auth_bp)
    app.register_blueprint(announcements_bp)
    app.register_blueprint(screens_bp)
    app.register_blueprint(sectors_bp)
    app.register_blueprint(users_bp)

    app.config['UPLOAD_FOLDER'] = 'uploads'
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=4000)
