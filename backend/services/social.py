import os
import requests
import time
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from .linkedin_token_service import get_valid_access_token

load_dotenv()

LINKEDIN_PERSON_ID = os.getenv("LINKEDIN_PERSON_ID")
INSTAGRAM_ACCOUNT_ID = os.getenv("INSTAGRAM_ACCOUNT_ID")
INSTAGRAM_API_VERSION = os.getenv("INSTAGRAM_API_VERSION", "v17.0")
FACEBOOK_PAGE_ID = os.getenv("FACEBOOK_PAGE_ID")
FACEBOOK_ACCESS_TOKEN = os.getenv("FACEBOOK_ACCESS_TOKEN")
FACEBOOK_API_VERSION = os.getenv("FACEBOOK_API_VERSION", "v17.0")
INSTAGRAM_ACCESS_TOKEN = FACEBOOK_ACCESS_TOKEN

# def publish_to_linkedin(project, caption: str, media , db: Session) -> bool:
#     if not LINKEDIN_PERSON_ID:
#         raise RuntimeError("LinkedIn credentials are not configured for personal posting.")

#     author = f"urn:li:person:{LINKEDIN_PERSON_ID}"
#     access_token = get_valid_access_token(db)

#     headers = {
#         "Authorization": f"Bearer {access_token}",
#         "Content-Type": "application/json",
#         "X-Restli-Protocol-Version": "2.0.0",
#     }

#     body = {
#         "author": author,
#         "lifecycleState": "PUBLISHED",
#         "specificContent": {
#             "com.linkedin.ugc.ShareContent": {
#                 "shareCommentary": {
#                     "text": caption,
#                 },
#                 "shareMediaCategory": "ARTICLE",
#                 "media": [
#                     {
#                         "status": "READY",
#                         "originalUrl": project.media_url,
#                         "title": {
#                             "text": project.title,
#                         },
#                         "description": {
#                             "text": project.description,
#                         },
#                     }
#                 ],
#             }
#         },
#         "visibility": {
#             "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
#         },
#     }

#     response = requests.post("https://api.linkedin.com/v2/ugcPosts", headers=headers, json=body, timeout=30)
#     try:
#         response.raise_for_status()
#     except requests.HTTPError as exc:
#         raise RuntimeError(
#             f"LinkedIn publish failed {response.status_code}: {response.text}"
#         ) from exc
#     return True

def register_upload(access_token, person_id, media_type="image"):
    recipe = (
        "urn:li:digitalmediaRecipe:feedshare-video"
        if media_type == "video"
        else "urn:li:digitalmediaRecipe:feedshare-image"
    )

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    body = {
        "registerUploadRequest": {
            "recipes": [recipe],
            "owner": f"urn:li:person:{person_id}",
            "serviceRelationships": [
                {
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent",
                }
            ],
        }
    }

    response = requests.post(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        headers=headers,
        json=body,
    )

    response.raise_for_status()

    data = response.json()

    upload_url = data["value"]["uploadMechanism"][
        "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ]["uploadUrl"]

    asset = data["value"]["asset"]

    return upload_url, asset

def upload_binary_to_linkedin(upload_url, media):
    media.file.seek(0)

    response = requests.put(
        upload_url,
        data=media.file,
        headers={
            "Content-Type": media.content_type
        },
    )

    response.raise_for_status()

def publish_to_linkedin(project, caption: str, media, db: Session) -> bool:

    if not LINKEDIN_PERSON_ID:
        raise RuntimeError("LinkedIn credentials are not configured.")

    access_token = get_valid_access_token(db)

    media_type = (
        "video"
        if media.content_type.startswith("video")
        else "image"
    )

    upload_url, asset = register_upload(
        access_token,
        LINKEDIN_PERSON_ID,
        media_type
    )

    upload_binary_to_linkedin(upload_url, media)

    # IMPORTANT FOR VIDEO
    if media_type == "video":
        time.sleep(10)

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    share_media_category = "VIDEO" if media_type == "video" else "IMAGE"

    body = {
        "author": f"urn:li:person:{LINKEDIN_PERSON_ID}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": caption,
                },
                "shareMediaCategory": share_media_category,
                "media": [
                    {
                        "status": "READY",
                        "media": asset,
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

    response = requests.post(
        "https://api.linkedin.com/v2/ugcPosts",
        headers=headers,
        json=body,
        timeout=60,
    )

    print("LINKEDIN RESPONSE:", response.text)

    response.raise_for_status()

    return True


def publish_to_instagram(project, caption: str) -> bool:

    create_url = (
        f"https://graph.facebook.com/"
        f"{INSTAGRAM_API_VERSION}/{INSTAGRAM_ACCOUNT_ID}/media"
    )

    # IMAGE
    if not project.video_url:

        payload = {
            "image_url": project.media_files[0]["url"],
            "caption": caption,
            "access_token": FACEBOOK_ACCESS_TOKEN,
        }

    # VIDEO / REEL
    else:

        payload = {
            "media_type": "REELS",
            "video_url": project.video_url,
            "caption": caption,
            "access_token": FACEBOOK_ACCESS_TOKEN,
        }

    create_response = requests.post(
        create_url,
        data=payload,
        timeout=120,
    )

    print("INSTAGRAM CREATE:", create_response.text)

    create_response.raise_for_status()

    creation_id = create_response.json()["id"]

    # IMPORTANT FOR VIDEOS
    if project.video_url:

        status_url = (
            f"https://graph.facebook.com/"
            f"{INSTAGRAM_API_VERSION}/{creation_id}"
        )

        for _ in range(30):

            status_response = requests.get(
                status_url,
                params={
                    "fields": "status_code",
                    "access_token": FACEBOOK_ACCESS_TOKEN,
                },
                timeout=30,
            )

            status_response.raise_for_status()

            status = status_response.json().get("status_code")

            print("INSTAGRAM STATUS:", status)

            if status == "FINISHED":
                break

            elif status == "ERROR":
                raise RuntimeError("Instagram video processing failed")

            time.sleep(5)

        else:
            raise RuntimeError("Instagram video processing timeout")

    publish_url = (
        f"https://graph.facebook.com/"
        f"{INSTAGRAM_API_VERSION}/{INSTAGRAM_ACCOUNT_ID}/media_publish"
    )

    publish_response = requests.post(
        publish_url,
        data={
            "creation_id": creation_id,
            "access_token": FACEBOOK_ACCESS_TOKEN,
        },
        timeout=120,
    )

    print("INSTAGRAM PUBLISH:", publish_response.text)

    publish_response.raise_for_status()

    return True

def publish_to_facebook(project, caption: str) -> bool:
    if not FACEBOOK_PAGE_ID or not FACEBOOK_ACCESS_TOKEN:
        raise RuntimeError("Facebook credentials are not configured.")

    headers = {
        "Authorization": f"Bearer {FACEBOOK_ACCESS_TOKEN}"
    }

    # IMAGE POST
    if not project.video_url:

        url = (
            f"https://graph.facebook.com/"
            f"{FACEBOOK_API_VERSION}/{FACEBOOK_PAGE_ID}/photos"
        )

        payload = {
            "url": project.media_files[0]["url"],
            "caption": caption,
        }

    # VIDEO POST
    else:

        url = (
            f"https://graph-video.facebook.com/"
            f"{FACEBOOK_API_VERSION}/{FACEBOOK_PAGE_ID}/videos"
        )

        payload = {
            "file_url": project.media_files[0]["url"],
            "description": caption,
        }

    response = requests.post(
        url,
        data=payload,
        headers=headers,
        timeout=120,
    )

    print("FACEBOOK STATUS:", response.status_code)
    print("FACEBOOK RESPONSE:", response.text)

    try:
        response.raise_for_status()

    except requests.HTTPError as exc:

        try:
            error_data = response.json()
        except Exception:
            error_data = response.text

        raise RuntimeError(
            f"Facebook publish failed: {error_data}"
        ) from exc

    return True