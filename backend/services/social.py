import os
import requests
from dotenv import load_dotenv

load_dotenv()

LINKEDIN_ACCESS_TOKEN = os.getenv("LINKEDIN_ACCESS_TOKEN")
LINKEDIN_ORGANIZATION_ID = os.getenv("LINKEDIN_ORGANIZATION_ID")
INSTAGRAM_ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN")
INSTAGRAM_ACCOUNT_ID = os.getenv("INSTAGRAM_ACCOUNT_ID")
INSTAGRAM_API_VERSION = os.getenv("INSTAGRAM_API_VERSION", "v17.0")


def publish_to_linkedin(project, caption: str) -> bool:
    if not LINKEDIN_ACCESS_TOKEN or not LINKEDIN_ORGANIZATION_ID:
        raise RuntimeError("LinkedIn credentials are not configured.")

    headers = {
        "Authorization": f"Bearer {LINKEDIN_ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    body = {
        "author": f"urn:li:organization:{LINKEDIN_ORGANIZATION_ID}",
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
    response.raise_for_status()
    return True


def publish_to_instagram(project, caption: str) -> bool:
    if not INSTAGRAM_ACCESS_TOKEN or not INSTAGRAM_ACCOUNT_ID:
        raise RuntimeError("Instagram credentials are not configured.")

    media_key = "video_url" if project.media_type and project.media_type.startswith("video") else "image_url"
    create_url = f"https://graph.facebook.com/{INSTAGRAM_API_VERSION}/{INSTAGRAM_ACCOUNT_ID}/media"
    create_payload = {
        media_key: project.media_url,
        "caption": caption,
        "access_token": INSTAGRAM_ACCESS_TOKEN,
    }

    create_response = requests.post(create_url, data=create_payload, timeout=30)
    create_response.raise_for_status()
    create_data = create_response.json()
    creation_id = create_data.get("id")
    if not creation_id:
        raise RuntimeError("Instagram media creation failed.")

    publish_url = f"https://graph.facebook.com/{INSTAGRAM_API_VERSION}/{INSTAGRAM_ACCOUNT_ID}/media_publish"
    publish_payload = {
        "creation_id": creation_id,
        "access_token": INSTAGRAM_ACCESS_TOKEN,
    }

    publish_response = requests.post(publish_url, data=publish_payload, timeout=30)
    publish_response.raise_for_status()
    return True
