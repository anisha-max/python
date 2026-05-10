import os
import requests
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from .linkedin_token_service import get_valid_access_token

load_dotenv()

LINKEDIN_PERSON_ID = os.getenv("LINKEDIN_PERSON_ID")
INSTAGRAM_ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN")
INSTAGRAM_ACCOUNT_ID = os.getenv("INSTAGRAM_ACCOUNT_ID")
INSTAGRAM_API_VERSION = os.getenv("INSTAGRAM_API_VERSION", "v17.0")


def publish_to_linkedin(project, caption: str, db: Session) -> bool:
    if not LINKEDIN_PERSON_ID:
        raise RuntimeError("LinkedIn credentials are not configured for personal posting.")

    author = f"urn:li:person:{LINKEDIN_PERSON_ID}"
    access_token = get_valid_access_token(db)

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    body = {
        "author": author,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": caption,
                },
                "shareMediaCategory": "ARTICLE",
                "media": [
                    {
                        "status": "READY",
                        "originalUrl": project.media_url,
                        "title": {
                            "text": project.title,
                        },
                        "description": {
                            "text": project.description,
                        },
                    }
                ],
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        },
    }

    response = requests.post("https://api.linkedin.com/v2/ugcPosts", headers=headers, json=body, timeout=30)
    try:
        response.raise_for_status()
    except requests.HTTPError as exc:
        raise RuntimeError(
            f"LinkedIn publish failed {response.status_code}: {response.text}"
        ) from exc
    return True


def publish_to_instagram(project, caption: str) -> bool:
    if not INSTAGRAM_ACCESS_TOKEN or not INSTAGRAM_ACCOUNT_ID:
        raise RuntimeError("Instagram credentials are not configured.")

    create_url = f"https://graph.facebook.com/{INSTAGRAM_API_VERSION}/{INSTAGRAM_ACCOUNT_ID}/media"
    create_payload = {
        "image_url": project.media_url,
        "caption": caption,
        "access_token": INSTAGRAM_ACCESS_TOKEN,
    }

    create_response = requests.post(create_url, data=create_payload, timeout=30)
    try:
        create_response.raise_for_status()
    except requests.HTTPError as exc:
        raise RuntimeError(
            f"Instagram media creation failed {create_response.status_code}: {create_response.text}"
        ) from exc

    create_data = create_response.json()
    creation_id = create_data.get("id")
    if not creation_id:
        raise RuntimeError(f"Instagram media creation returned no id: {create_data}")

    publish_url = f"https://graph.facebook.com/{INSTAGRAM_API_VERSION}/{INSTAGRAM_ACCOUNT_ID}/media_publish"
    publish_payload = {
        "creation_id": creation_id,
        "access_token": INSTAGRAM_ACCESS_TOKEN,
    }

    publish_response = requests.post(publish_url, data=publish_payload, timeout=30)
    try:
        publish_response.raise_for_status()
    except requests.HTTPError as exc:
        raise RuntimeError(
            f"Instagram publish failed {publish_response.status_code}: {publish_response.text}"
        ) from exc
    return True
