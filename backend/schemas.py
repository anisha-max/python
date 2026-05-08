from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: str

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    reviewed_caption: Optional[str] = None
    approval_status: Optional[str] = None

class Project(ProjectBase):
    id: int
    media_url: str
    media_type: str
    generated_caption: Optional[str] = None
    reviewed_caption: Optional[str] = None
    approval_status: str
    posted_to_linkedin: bool
    posted_to_instagram: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True