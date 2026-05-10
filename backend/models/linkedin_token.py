from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from database import Base

class LinkedInToken(Base):
    __tablename__ = "linkedin_tokens"

    id = Column(Integer, primary_key=True, index=True)
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
