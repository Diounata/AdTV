from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db
from models.user import User
from features.auth.routes import auth_bp
from features.users.routes import users_bp


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=4000)
