# SignalFold

**Evidence-first AI investigation agent** — Nebius Global AI Hackathon submission (Best Apps and Agents track).

## What it does

A user submits a public webpage URL or pastes free-form text. SignalFold:

1. Extracts important factual claims from the input.
2. Searches for relevant evidence using Tavily Search.
3. Evaluates whether the evidence supports or contradicts each claim using **NVIDIA Nemotron** (served via Nebius Token Factory).
4. Returns a decision brief with source citations, verdict labels, and uncertainty scores.

---

## Project structure

```
SignalFold/
├── frontend/          # React + Vite UI
├── backend/           # Python FastAPI service
├── .env.example       # Environment variable template (no real keys)
├── .gitignore
└── README.md
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18 + |
| Python | 3.11 + |
| npm | 9 + |

---

## Quick start

### 1. Clone and copy env template

```bash
git clone <repo-url>
cd SignalFold
cp .env.example .env
# Fill in real values — never commit .env
```

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Health check: `GET http://localhost:8000/health`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173`

---

## Environment variables

See `.env.example` for all required keys. The backend reads values from `.env` at startup; the frontend **never** receives API keys.

---

## Tech stack

- **Frontend** — React 18, Vite 5
- **Backend** — FastAPI, Uvicorn, Pydantic v2
- **AI model** — NVIDIA Nemotron via Nebius Token Factory (OpenAI-compatible endpoint)
- **Web search** — Tavily Search API
- **Storage** — SQLite (via Python `sqlite3`)

---

## Hackathon compliance

- Uses an NVIDIA open-source model (Nemotron) through the Nebius Token Factory endpoint.
- No fake results, fabricated citations, or hardcoded secrets.
- All secret values read exclusively from environment variables.

---

## Status

> **Initial scaffold only.** Research agent logic, frontend UI, and database layer are not yet implemented.
