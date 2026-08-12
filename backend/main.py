from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field

from pypdf import PdfReader
from docx import Document

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

model = "openai/gpt-oss-120b"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Resume file path
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
RESUME_PATH = BASE_DIR / "Sanjana_Resume.pdf"


# --------------------------------------------------
# Resume Models
# --------------------------------------------------

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []


class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = []
    experiences: list[Experience] = []
    education: list[str] = []
    projects: list[str] = []
    certifications: list[str] = []


resume_schema = Resume.model_json_schema()


# --------------------------------------------------
# User Question
# --------------------------------------------------

class ChatRequest(BaseModel):
    question: str


# --------------------------------------------------
# Ask Candidate
# --------------------------------------------------

def ask_candidate(question: str, resume: Resume):

    system_prompt = f"""
You are an AI assistant representing Sanjana Madishetti in a job interview context.

Verified Candidate Profile & Links:

- Name: Sanjana Madishetti
- GitHub: https://github.com/Sanjana27904
- LinkedIn: https://www.linkedin.com/in/sanjana-madishetti-759939336/
- Email: sanjanamadishetti27@gmail.com

Candidate Resume Data:
{resume.model_dump_json(indent=2)}

Rules & Guidelines:

1. Grounding: Answer strictly using the resume context and verified details above. Never hallucinate or invent unverified experience or links.

2. Missing Info: If asked about something not mentioned in the candidate's resume or background, say:
"I don't have enough information to answer that."

3. Contact Details: If asked for GitHub, LinkedIn, portfolio, email, or contact info, ALWAYS provide the exact URLs/details listed above.

4. Tone & Roleplay: Answer as if HR is interviewing Sanjana directly. Maintain a professional, confident, and engaging tone.

CRITICAL INSTRUCTION FOR INTRODUCTIONS ("Tell me about yourself"):

- Speak in natural, conversational FIRST-PERSON ("I", "my", "I'm").
- Do NOT read out bulleted lists, technical skill dumps, or markdown headings unless explicitly asked for a list format.
- Structure your elevator pitch naturally:

  1. Introduction: CS student at Malla Reddy University (CGPA 9.2/10).
  2. Core Focus: Backend engineering and AI integration (Java, Python, FastAPI, Spring Boot, SQL).
  3. Projects Highlight: Briefly mention key projects like UPI MeshPay (offline payments) and Smart Civic (AI complaint management).
  4. Closing: Express enthusiasm for contributing problem-solving skills to scalable development teams.
"""

    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    return response.choices[0].message.content


# --------------------------------------------------
# Parse Resume
# --------------------------------------------------

def parse_resume(resume_text):

    system_prompt = f"""
You are an expert resume parser.

Extract information from the resume based on its meaning,
not only based on exact section headings.

Different resumes may use different headings.

For example:
- Experience
- Professional Experience
- Work History
- Employment
- Internships

These may all contain relevant experience.

Skills may also appear in the skills section, work experience,
internships or projects.

Return ONLY valid JSON matching this schema:

{resume_schema}

Important rules:

1. Do not invent information.
2. If a value is not available, return null.
3. If a list has no information, return an empty list.
4. Include internships inside experiences.
5. Extract skills mentioned across the entire resume.
"""

    user_prompt = f"""
Parse the following resume:

{resume_text}
"""

    message_system = {
        "role": "system",
        "content": system_prompt
    }

    message_user = {
        "role": "user",
        "content": user_prompt
    }

    messages = [message_system, message_user]

    response_format = {
        "type": "json_object"
    }

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format=response_format
    )

    raw_output = response.choices[0].message.content

    data = json.loads(raw_output)

    resume = Resume(**data)

    return resume


# --------------------------------------------------
# PDF Extraction
# --------------------------------------------------

def read_pdf(file_path: Path):

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


# --------------------------------------------------
# Home / Health Check
# --------------------------------------------------

@app.get("/")
def home():

    resume_text = read_pdf(RESUME_PATH)

    resume = parse_resume(resume_text)

    print(resume.model_dump_json(indent=2))

    return {
        "message": "Reflekt AI Backend API is running!"
    }


# --------------------------------------------------
# Chat Endpoint
# --------------------------------------------------

@app.post("/api/chat")
def chat(request: ChatRequest):

    resume_text = read_pdf(RESUME_PATH)

    resume = parse_resume(resume_text)

    answer = ask_candidate(request.question, resume)

    return {
        "answer": answer
    }
