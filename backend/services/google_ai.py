import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=GOOGLE_API_KEY)

def generate_caption(title: str, description: str, tech_stack: str) -> str:
    prompt = (
        f"Write a short, engaging social media caption for a project titled "
        f"'{title}' with the description '{description}', using technologies "
        f"{tech_stack}. Keep it formatted for LinkedIn and Instagram and "
        f"include a strong marketing hook."
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text