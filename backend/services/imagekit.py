from imagekitio import ImageKit
import os
from dotenv import load_dotenv

load_dotenv()

imagekit = ImageKit(
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY"),
    public_key=os.getenv("IMAGEKIT_PUBLIC_KEY"),
    url_endpoint=os.getenv("IMAGEKIT_URL_ENDPOINT"),
)

IMAGEKIT_FOLDER = os.getenv("IMAGEKIT_FOLDER", "/projects/")


def upload_media(file):
    file.file.seek(0)
    file_content = file.file.read()

    if not file_content:
        raise RuntimeError("No media content provided for upload.")

    try:
        upload_info = imagekit.files.upload(
            file=file_content,
            file_name=file.filename,
            folder=IMAGEKIT_FOLDER,
            use_unique_file_name=True,
        )
    except Exception as exc:
        raise RuntimeError(f"ImageKit upload failed: {exc}") from exc

    if isinstance(upload_info, dict):
        url = upload_info.get("url")
    else:
        url = getattr(upload_info, "url", None)

    if not url:
        raise RuntimeError("ImageKit upload completed but no URL was returned.")

    return url