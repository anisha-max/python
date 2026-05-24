# routes/projects.py

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form
)

from sqlalchemy.orm import Session

import json

from database import get_db

from models import Project as ProjectModel

from schemas import (
    Project as ProjectSchema,
    ProjectUpdate
)

from services.imagekit import upload_media

from services.google_ai import generate_caption

from services.social import (
    publish_to_instagram,
    publish_to_linkedin,
    publish_to_facebook
)

router = APIRouter()


@router.post(
    "/projects",
    response_model=ProjectSchema
)
def create_project(

    title: str = Form(...),

    description: str = Form(...),

    tech_stack: str = Form(...),

    # NEW FIELDS

    subtitle: str = Form(None),

    role: str = Form(None),

    duration: str = Form(None),

    status: str = Form(None),

    overview: str = Form(None),

    problem: str = Form(None),

    solution: str = Form(None),

    architecture: str = Form(None),

    challenges: str = Form(None),

    performance: str = Form(None),

    security: str = Form(None),

    learnings: str = Form(None),

    features: str = Form(None),

    future_improvements: str = Form(None),

    github_link: str = Form(None),

    live_link: str = Form(None),

    # MEDIA

    media: UploadFile = File(...),

    db: Session = Depends(get_db)
):

    # UPLOAD MEDIA

    try:

        media.file.seek(0)

        media_url = upload_media(media)

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc)
        ) from exc

    # GEMINI

    try:

        caption_data = generate_caption({

            "title": title,

            "description": description,

            "tech_stack": tech_stack,

            "subtitle": subtitle,

            "role": role,

            "duration": duration,

            "status": status,

            "overview": overview,

            "problem": problem,

            "solution": solution,

            "architecture": architecture,

            "challenges": challenges,

            "performance": performance,

            "security": security,

            "learnings": learnings,

            "features": features,

            "future_improvements": future_improvements,

            "github_link": github_link,

            "live_link": live_link,
        })

        generated_caption = (
            json.dumps(caption_data)
            if isinstance(
                caption_data,
                dict
            )
            else caption_data
        )

    except Exception as exc:

        print(
            f"Caption generation failed: {exc}"
        )

        generated_caption = None

        caption_data = None

    # MEDIA TYPE

    media_type = (
        "video"
        if media.content_type
        and media.content_type.startswith(
            "video"
        )
        else "image"
    )

    # DATABASE

    db_project = ProjectModel(

        title=title,

        description=description,

        tech_stack=tech_stack,

        subtitle=subtitle,

        role=role,

        duration=duration,

        status=status,

        overview=overview,

        problem=problem,

        solution=solution,

        architecture=architecture,

        challenges=challenges,

        performance=performance,

        security=security,

        learnings=learnings,

        features=features,

        future_improvements=future_improvements,

        github_link=github_link,

        live_link=live_link,

        media_url=media_url,

        media_type=media_type,

        generated_caption=generated_caption,

        approval_status="pending_review",
    )

    db.add(db_project)

    db.commit()

    db.refresh(db_project)

    # AUTO POST
    print("MEDIA URL:", media_url)
    if caption_data:
        import time
        time.sleep(10)
        # LINKEDIN

        # try:
        
        #     linkedin_caption = (
        #         caption_data.get(
        #             "linkedin_caption",
        #             ""
        #         )
        #     )
        
        #     publish_to_linkedin(
        #         db_project,
        #         linkedin_caption,
        #         media,
        #         db
        #     )
        
        #     db_project.posted_to_linkedin = True
        
        # except Exception as e:
        
        #     print(
        #         f"Failed to post to LinkedIn: {e}"
        #     )

        # INSTAGRAM

        try:

            instagram_caption = (
                caption_data.get(
                    "instagram_caption",
                    ""
                )
            )

            publish_to_instagram(
                db_project,
                instagram_caption
            )

            db_project.posted_to_instagram = True

        except Exception as e:

            print(
                f"Failed to post to Instagram: {e}"
            )

        # FACEBOOK

        try:

            facebook_caption = (
                caption_data.get(
                    "linkedin_caption",
                    ""
                )
            )

            publish_to_facebook(
                db_project,
                facebook_caption
            )

            db_project.posted_to_facebook = True

        except Exception as e:

            print(
                f"Failed to post to Facebook: {e}"
            )

        db.commit()

    return db_project


@router.get(
    "/projects",
    response_model=list[ProjectSchema]
)
def get_projects(
    db: Session = Depends(get_db)
):

    return db.query(
        ProjectModel
    ).all()


@router.get(
    "/projects/{project_id}",
    response_model=ProjectSchema
)
def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(
        ProjectModel
    ).get(project_id)

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project


@router.patch(
    "/projects/{project_id}",
    response_model=ProjectSchema
)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db)
):

    project = db.query(
        ProjectModel
    ).get(project_id)

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    update_data = (
        project_update.dict(
            exclude_unset=True
        )
    )

    for field, value in update_data.items():

        setattr(
            project,
            field,
            value
        )

    db.add(project)

    db.commit()

    db.refresh(project)

    return project