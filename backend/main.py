from fastapi import FastAPI, Request
from database import engine
from models import Base
from routes import projects

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(projects.router)

@app.get("/auth/linkedin/callback")
async def linkedin_callback(request: Request):
    code = request.query_params.get("code")

    return {
        "message": "LinkedIn OAuth successful",
        "authorization_code": code
    }