from imagekitio import ImageKit
import os
from dotenv import load_dotenv

load_dotenv()

imagekit = ImageKit()

def upload_media(file):
    file.file.seek(0)
    file_content = file.file.read()

    try:
        upload_info = imagekit.files.upload(
            file=file_content,
            file_name=file.filename,
            folder="/python/",
            use_unique_file_name=True,
        )
    except Exception as exc:
        raise RuntimeError(f"ImageKit upload failed: {exc}") from exc

    return upload_info.url