from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from models import Project as ProjectModel
from schemas import ProjectCreate, Project as ProjectSchema
from services.webhook import send_webhook
from services.imagekit import upload_video

router = APIRouter()

@router.post("/projects", response_model=ProjectSchema)
def create_project(
    title: str = Form(...),
    description: str = Form(...),
    tech_stack: str = Form(...),
    video: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        video_url = upload_video(video)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    db_project = ProjectModel(title=title, description=description, tech_stack=tech_stack, video_url=video_url)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    send_webhook(db_project)
    return db_project

@router.get("/projects", response_model=list[ProjectSchema])
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(ProjectModel).all()
    return projects