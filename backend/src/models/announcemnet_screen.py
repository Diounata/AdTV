import uuid
from extensions import db
from sqlalchemy.orm import relationship

class AnnouncementScreen(db.Model):
    __tablename__ = 'announcements_screens'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    announcement_id = db.Column(db.String(36), db.ForeignKey('announcements.id'))
    screen_id = db.Column(db.String(36), db.ForeignKey('screens.id'), nullable=False)

    announcement = relationship('Announcement', foreign_keys=[announcement_id], backref='screen_announcements')
    screen = relationship('Screen', foreign_keys=[screen_id], backref='screen_announcements')

    def __repr__(self):
        return f'<AnnouncementScreen {self.announcement.title if self.announcement else "No Announcement"}>'

    def to_dict(self):
        return {
            'id': self.id,
            'announcementName': self.announcement.name if self.announcement else None,
            'mediaFilename': self.announcement.media_filename if self.announcement else None,
        }
