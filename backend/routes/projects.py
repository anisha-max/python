from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from models import Project as ProjectModel
from schemas import Project as ProjectSchema, ProjectUpdate
from services.imagekit import upload_media
from services.google_ai import generate_caption
from services.social import publish_to_instagram, publish_to_linkedin

router = APIRouter()

@router.post("/projects", response_model=ProjectSchema)
def create_project(
    title: str = Form(...),
    description: str = Form(...),
    tech_stack: str = Form(...),
    media: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        media_url = upload_media(media)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    try:
        generated_caption = generate_caption(title, description, tech_stack)
    except Exception:
        generated_caption = None

    db_project = ProjectModel(
        title=title,
        description=description,
        tech_stack=tech_stack,
        media_url=media_url,
        media_type=media.content_type or "video",
        generated_caption=generated_caption,
        approval_status="pending_review",
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    # Auto-post to social media if caption was generated
    if generated_caption:
        try:
            publish_to_linkedin(db_project, generated_caption)
            db_project.posted_to_linkedin = True
        except Exception as e:
            print(f"Failed to post to LinkedIn: {e}")

        try:
            publish_to_instagram(db_project, generated_caption)
            db_project.posted_to_instagram = True
        except Exception as e:
            print(f"Failed to post to Instagram: {e}")

        db.commit()

    return db_project

@router.get("/projects", response_model=list[ProjectSchema])
def get_projects(db: Session = Depends(get_db)):
    return db.query(ProjectModel).all()

@router.get("/projects/{project_id}", response_model=ProjectSchema)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(ProjectModel).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.patch("/projects/{project_id}", response_model=ProjectSchema)
def update_project(project_id: int, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(ProjectModel).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = project_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)

    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.post("/projects/{project_id}/approve", response_model=ProjectSchema)
def approve_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(ProjectModel).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if project.approval_status == "posted" and project.posted_to_linkedin and project.posted_to_instagram:
        return project

    final_caption = project.reviewed_caption or project.generated_caption
    if not final_caption:
        final_caption = generate_caption(project.title, project.description, project.tech_stack)
        project.generated_caption = final_caption

    linkedin_result = False
    instagram_result = False
    posting_errors = []

    try:
        linkedin_result = publish_to_linkedin(project, final_caption)
    except Exception as exc:
        posting_errors.append(f"LinkedIn: {exc}")

    try:
        instagram_result = publish_to_instagram(project, final_caption)
    except Exception as exc:
        posting_errors.append(f"Instagram: {exc}")

    project.posted_to_linkedin = linkedin_result
    project.posted_to_instagram = instagram_result
    project.approval_status = "posted" if linkedin_result and instagram_result else "approved"

    db.add(project)
    db.commit()
    db.refresh(project)

    if posting_errors:
        raise HTTPException(status_code=502, detail={"errors": posting_errors, "project_id": project.id})

    return project