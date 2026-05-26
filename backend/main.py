from fastapi import FastAPI, Request
from database import engine
from models import Base
from routes import projects , login
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(login.router)

@app.get("/auth/linkedin/callback")
async def linkedin_callback(request: Request):
    code = request.query_params.get("code")

    return {
        "message": "LinkedIn OAuth successful",
        "authorization_code": code
    }