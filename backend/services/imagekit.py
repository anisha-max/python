from imagekitio import ImageKit
import os
from dotenv import load_dotenv

load_dotenv()

imagekit = ImageKit(
    public_key=os.getenv("IMAGEKIT_PUBLIC_KEY"),
    url_endpoint=os.getenv("IMAGEKIT_URL_ENDPOINT"),
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY"),
)

def upload_video(file):
    file.file.seek(0)
    file_content = file.file.read()

    try:
        upload_info = imagekit.upload_file(
            file=file_content,
            file_name=file.filename,
            options={"folder": "/portfolio_videos/"}
        )
    except Exception as exc:
        raise RuntimeError(f"ImageKit upload failed: {exc}") from exc

    if isinstance(upload_info, dict):
        if "url" in upload_info:
            return upload_info["url"]
        if "response" in upload_info and isinstance(upload_info["response"], dict):
            response = upload_info["response"]
            if "url" in response:
                return response["url"]
        raise RuntimeError(f"Unexpected ImageKit response: {upload_info}")

    if hasattr(upload_info, "url"):
        return upload_info.url

    raise RuntimeError(f"Could not determine ImageKit upload URL from response: {upload_info}")