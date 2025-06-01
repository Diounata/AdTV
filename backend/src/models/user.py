import uuid
from datetime import datetime, timezone
from extensions import db
from sqlalchemy import event
from werkzeug.security import generate_password_hash


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(10), nullable=False, default='DEFAULT')  # 'ADMIN' | 'DEFAULT'
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=None, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    @staticmethod
    def populate_initial_users(target, connection, **kw):
        now = datetime.now(timezone.utc)
        users = [
            {
                'id': str(uuid.uuid4()),
                'name': 'Gabriel Freitas',
                'type': 'ADMIN',
                'email': 'gabriel.freitas8@estudante.ifms.edu.br',
                'hashed_password': generate_password_hash('gabriel123'),
                'created_at': now,
                'updated_at': None
            },
            {
                'id': str(uuid.uuid4()),
                'name': 'Gustavo Freitas',
                'type': 'ADMIN',
                'email': 'gustavo.freitas4@estudante.ifms.edu.br',
                'hashed_password': generate_password_hash('gustavo123'),
                'created_at': now,
                'updated_at': None
            },
            {
                'id': str(uuid.uuid4()),
                'name': 'Jonatham Luz',
                'type': 'ADMIN',
                'email': 'jonatham.luz@estudante.ifms.edu.br',
                'hashed_password': generate_password_hash('jonatham123'),
                'created_at': now,
                'updated_at': None
            },
            {
                'id': str(uuid.uuid4()),
                'name': 'Victor Ayabe',
                'type': 'ADMIN',
                'email': 'victor.ayabe@estudante.ifms.edu.br',
                'hashed_password': generate_password_hash('victor123'),
                'created_at': now,
                'updated_at': None
            }
        ]

        connection.execute(target.insert(), users)


event.listen(User.__table__, 'after_create', User.populate_initial_users)
