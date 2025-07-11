class Config:
    JWT_SECRET_KEY = 'SECRET_KEY'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///adtv.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'uploads'
