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
    deleted_at = db.Column(db.DateTime, nullable=True)
    deleted_by = db.Column(
        db.String(36), db.ForeignKey('users.id'), nullable=True)

    creator = relationship('User', foreign_keys=[
                           created_by], backref='created_sectors')
    updater = relationship('User', foreign_keys=[
                           updated_by], backref='updated_sectors')
    deleter = relationship('User', foreign_keys=[
                           deleted_by], backref='deleted_sectors')

    def __repr__(self):
        return f'<Sector {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'createdAt': self.created_at.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z' if self.created_at else None,
            'createdBy': self.created_by,
            'updatedAt': self.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z' if self.updated_at else None,
            'updatedBy': self.updated_by
        }
