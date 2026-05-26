from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from auth import create_token
import os

router = APIRouter()

class LoginData(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: LoginData):

    admin_username = os.getenv("ADMIN_USERNAME")
    admin_password = os.getenv("ADMIN_PASSWORD")

    if (
        data.username != admin_username
        or
        data.password != admin_password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_token()

    return {
        "token": token
    }