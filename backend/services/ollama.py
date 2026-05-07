import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=GOOGLE_API_KEY)

def generate_caption(title: str, description: str, tech_stack: str) -> str:
    prompt = (
        "Write a short, engaging social media caption for a project titled '"
        f"{title}' with the description '{description}', using technologies {tech_stack}. "
        "Keep it formatted for LinkedIn and Instagram and include a strong marketing hook."
    )

    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    response = model.generate_content(prompt)
    return response.text.strip()
