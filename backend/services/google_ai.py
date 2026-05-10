import os
import json

from google import genai
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=GOOGLE_API_KEY)


def generate_caption(title: str, description: str, tech_stack: str):

    prompt = f"""
    Generate TWO social media captions for this project.

    Project Title: {title}
    Description: {description}
    Tech Stack: {tech_stack}

    Rules:
    - Generate ONE LinkedIn caption
    - Generate ONE Instagram caption
    - Return ONLY valid JSON
    - No markdown
    - No explanations
    - No headings
    - No options
    - Captions should be ready to post directly
    - LinkedIn should sound professional
    - Instagram should sound engaging and energetic
    - Include relevant hashtags

    Output format:

    {{
      "linkedin_caption": "...",
      "instagram_caption": "..."
    }}
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    return json.loads(text)