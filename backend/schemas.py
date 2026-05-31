# schemas.py

from pydantic import BaseModel

from datetime import datetime

from typing import List, Dict, Any , Optional



class ProjectBase(BaseModel):

    title: str

    description: str

    tech_stack: str

    # BASIC

    subtitle: Optional[str] = None

    role: Optional[str] = None

    duration: Optional[str] = None

    status: Optional[str] = None

    # CORE

    overview: Optional[str] = None

    problem: Optional[str] = None

    solution: Optional[str] = None

    # EXTRA

    architecture: Optional[str] = None

    challenges: Optional[str] = None

    performance: Optional[str] = None

    security: Optional[str] = None

    learnings: Optional[str] = None

    features: Optional[str] = None

    future_improvements: Optional[str] = None

    # LINKS

    github_link: Optional[str] = None

    live_link: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):

    title: Optional[str] = None

    description: Optional[str] = None

    tech_stack: Optional[str] = None

    reviewed_caption: Optional[str] = None

    approval_status: Optional[str] = None

    subtitle: Optional[str] = None

    role: Optional[str] = None

    duration: Optional[str] = None

    status: Optional[str] = None

    overview: Optional[str] = None

    problem: Optional[str] = None

    solution: Optional[str] = None

    architecture: Optional[str] = None

    challenges: Optional[str] = None

    performance: Optional[str] = None

    security: Optional[str] = None

    learnings: Optional[str] = None

    features: Optional[str] = None

    future_improvements: Optional[str] = None

    github_link: Optional[str] = None

    live_link: Optional[str] = None


class Project(ProjectBase):

    id: int

    media_files: List[Dict[str, Any]]

    generated_caption: Optional[str] = None

    reviewed_caption: Optional[str] = None

    approval_status: str

    posted_to_linkedin: bool

    posted_to_instagram: bool

    posted_to_facebook: bool

    created_at: datetime

    updated_at: datetime

    class Config:
        from_attributes = True