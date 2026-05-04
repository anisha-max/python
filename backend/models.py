from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    tech_stack = Column(String)
    video_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)