# models.py

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    Text
)

from datetime import datetime

from database import Base

from .linkedin_token import LinkedInToken


class Project(Base):

    __tablename__ = "projects"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # BASIC

    title = Column(
        String,
        index=True
    )

    subtitle = Column(
        String,
        nullable=True
    )

    role = Column(
        String,
        nullable=True
    )

    duration = Column(
        String,
        nullable=True
    )

    status = Column(
        String,
        nullable=True
    )

    # CORE

    description = Column(Text)

    overview = Column(
        Text,
        nullable=True
    )

    problem = Column(
        Text,
        nullable=True
    )

    solution = Column(
        Text,
        nullable=True
    )

    # EXTRA

    architecture = Column(
        Text,
        nullable=True
    )

    challenges = Column(
        Text,
        nullable=True
    )

    performance = Column(
        Text,
        nullable=True
    )

    security = Column(
        Text,
        nullable=True
    )

    learnings = Column(
        Text,
        nullable=True
    )

    features = Column(
        Text,
        nullable=True
    )

    future_improvements = Column(
        Text,
        nullable=True
    )

    # LINKS

    github_link = Column(
        String,
        nullable=True
    )

    live_link = Column(
        String,
        nullable=True
    )

    # EXISTING

    tech_stack = Column(String)

    video_url = Column(String)

    media_url = Column(String)

    media_type = Column(
        String,
        default="video"
    )

    generated_caption = Column(
        Text,
        nullable=True
    )

    reviewed_caption = Column(
        Text,
        nullable=True
    )

    approval_status = Column(
        String,
        default="pending_review"
    )

    posted_to_linkedin = Column(
        Boolean,
        default=False
    )

    posted_to_instagram = Column(
        Boolean,
        default=False
    )

    posted_to_facebook = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )