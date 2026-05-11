from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from datetime import datetime
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    tech_stack = Column(String)
    video_url = Column(String)
    media_url = Column(String)
    media_type = Column(String, default="video")
    generated_caption = Column(Text, nullable=True)
    reviewed_caption = Column(Text, nullable=True)
    approval_status = Column(String, default="pending_review")
    posted_to_linkedin = Column(Boolean, default=False)
    posted_to_instagram = Column(Boolean, default=False)
    posted_to_facebook = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

from .linkedin_token import LinkedInToken
