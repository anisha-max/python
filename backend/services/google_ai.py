# services/google_ai.py

import os
import json

from google import genai

from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv(
    "GOOGLE_API_KEY"
)

client = genai.Client(
    api_key=GOOGLE_API_KEY
)


def generate_caption(project_data: dict):

    prompt = f"""
Generate social media captions for this software project.

PROJECT DATA:
{json.dumps(project_data, indent=2)}

RULES:
- Generate ONE LinkedIn caption
- Generate ONE Instagram caption
- Return ONLY valid JSON
- No markdown
- No explanations
- No headings
- Professional and engaging
- Mention technologies naturally
- Mention challenges and solutions naturally
- Mention performance/scalability if present
- Add relevant hashtags

OUTPUT FORMAT:

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

    text = text.replace(
        "```json",
        ""
    ).replace(
        "```",
        ""
    ).strip()

    return json.loads(text)