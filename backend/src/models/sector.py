import uuid
from datetime import datetime, timezone
from extensions import db
from sqlalchemy.orm import relationship


class Sector(db.Model):
    __tablename__ = 'sectors'

    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone.utc), nullable=False)
    created_by = db.Column(
        db.String(36), db.ForeignKey('users.id'), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    updated_by = db.Column(
        db.String(36), db.ForeignKey('users.id'), nullable=True)

    creator = relationship('User', foreign_keys=[
                           created_by], backref='created_sectors')
    updater = relationship('User', foreign_keys=[
                           updated_by], backref='updated_sectors')

    def __repr__(self):
        return f'<Sector {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'created_by': self.created_by,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'updated_by': self.updated_by
        }
