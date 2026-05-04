import os
import requests
from dotenv import load_dotenv

load_dotenv()

WEBHOOK_URL = os.getenv("WEBHOOK_URL")

def send_webhook(project):
    payload = {
        "title": project.title,
        "description": project.description,
        "tech_stack": project.tech_stack,
        "video_url": project.video_url
    }
    try:
        response = requests.post(WEBHOOK_URL, json=payload)
        response.raise_for_status()
        print("Webhook sent successfully")
    except requests.exceptions.RequestException as e:
        print(f"Failed to send webhook: {e}")