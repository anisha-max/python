import os
import requests
from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama2")


def generate_caption(title: str, description: str, tech_stack: str) -> str:
    prompt = (
        "Write a short, engaging social media caption for a project titled '"
        f"{title}' with the description '{description}', using technologies {tech_stack}. "
        "Keep it formatted for LinkedIn and Instagram and include a strong marketing hook."
    )
    url = f"{OLLAMA_URL}/v1/generate"
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "max_tokens": 180,
        "temperature": 0.7,
    }

    response = requests.post(url, json=payload, timeout=30)
    response.raise_for_status()
    data = response.json()

    if isinstance(data, dict):
        if "text" in data:
            return data["text"].strip()
        if "generated_text" in data:
            return data["generated_text"].strip()
        if "result" in data and isinstance(data["result"], list) and data["result"]:
            first = data["result"][0]
            if isinstance(first, dict) and "content" in first:
                return str(first["content"]).strip()
    raise RuntimeError("Unexpected Ollama response format.")
