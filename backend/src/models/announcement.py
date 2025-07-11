import uuid
from extensions import db
from sqlalchemy.orm import relationship


class Announcement(db.Model):
    __tablename__ = 'announcements'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(120), nullable=False)
    media_filename = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    created_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    updated_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=True)
    deleted_at = db.Column(db.DateTime, nullable=True)
    deleted_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=True)

    creator = relationship('User', foreign_keys=[created_by], backref='created_announcements')
    updater = relationship('User', foreign_keys=[updated_by], backref='updated_announcements')

    def __repr__(self):
        return f'<Announcement {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'mediaFilename': self.media_filename,
        }
