from datetime import datetime
from extensions import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(10), nullable=False,
                     default='DEFAULT')  # 'ADMIN' | 'DEFAULT'
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(256), nullable=False)
    created_at = db.Column(
        db.String, default=lambda: datetime.utcnow().isoformat(), nullable=False)
    updated_at = db.Column(db.String, nullable=True, default=None)

    def __repr__(self):
        return f'<User {self.email}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
