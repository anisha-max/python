import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session

load_dotenv()

LINKEDIN_ACCESS_TOKEN = os.getenv("LINKEDIN_ACCESS_TOKEN")


def get_valid_access_token(db: Session) -> str:
    if not LINKEDIN_ACCESS_TOKEN:
        raise RuntimeError("LINKEDIN_ACCESS_TOKEN is not configured in the environment.")
    return LINKEDIN_ACCESS_TOKEN
