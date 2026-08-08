# ✨ Reflekt AI

### Your Resume, Reflected Through AI.

Reflekt AI is an **AI-powered interactive portfolio** that allows recruiters, hiring managers, and visitors to chat directly with my resume.

Instead of simply viewing a static resume, visitors can ask questions about my **skills, projects, education, experience, and technical background** and receive contextual answers generated using an LLM.

The project combines **React, FastAPI, Pydantic, PDF processing, and Groq's LLM API** to transform a traditional resume into a conversational AI experience.

---

## 🚀 What is Reflekt AI?

A traditional resume is static.

Reflekt AI makes it interactive.

Recruiters can ask questions such as:

- **"Tell me about Sanjana's top projects."**
- **"What is her experience with Python and FastAPI?"**
- **"What is her educational background?"**
- **"Why should we hire Sanjana?"**
- **"What backend technologies does she know?"**
- **"Tell me about her AI projects."**

The AI uses the candidate's resume as its primary source of information and is instructed not to invent experience or skills that are not present in the provided information.

---

## ✨ Key Features

### 🤖 AI Resume Chatbot
Interact with an AI representation of my professional profile through natural-language questions.

### 📄 Resume-Based AI Context
The backend extracts text from the resume PDF and converts it into structured candidate information.

### 🧠 Structured Resume Parsing
Resume information is organized into structured fields including:

- Name
- Email
- Phone
- Skills
- Experience
- Education
- Projects
- Certifications
- Total experience

### 🎯 Grounded Responses
The AI is instructed to:

- Use verified resume information
- Avoid inventing skills or experience
- Clearly indicate when information is unavailable
- Maintain a professional and confident tone
- Provide verified professional links when requested

### 💬 Recruiter-Friendly Interface
The frontend provides suggested questions so recruiters can quickly explore the candidate's profile.

### 📥 Resume Download
Visitors can download the resume directly from the portfolio.

### 🔗 Professional Links
Quick access to:

- GitHub
- LinkedIn
- Email
- Resume

### 🎨 Interactive UI
The application includes:

- Personalized landing page
- AI chat interface
- Suggested questions
- Chat history
- Loading indicators
- Clear chat functionality
- Sidebar navigation
- Responsive design
- Smooth UI animations

---

# 🛠️ Tech Stack

## Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- python-dotenv

## AI / LLM

- Groq API
- `openai/gpt-oss-120b`
- Prompt Engineering
- Structured JSON Output

## Document Processing

- PyPDF
- python-docx

---

# 🏗️ Project Architecture

```text
                         ┌─────────────────────┐
                         │      Recruiter      │
                         │      / Visitor      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │     Reflekt AI      │
                         └──────────┬──────────┘
                                    │
                              POST /chat
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   FastAPI Backend   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Resume PDF      │
                         │   Text Extraction   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    Resume Parser    │
                         │  Pydantic Schema    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Groq API       │
                         │    LLM Inference    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Contextual Answer  │
                         └─────────────────────┘
