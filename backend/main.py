"""
SignalFold — FastAPI backend
Entry point: uvicorn main:app --reload --port 8000
"""
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import health

# Load .env (if present) before anything else
load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown hook — extend here for DB init, etc."""
    yield


app = FastAPI(
    title="SignalFold API",
    version="0.1.0",
    description="Evidence-first AI investigation agent — backend service",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────────────────
_raw_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(health.router, prefix="/api")

# Future routers will be registered here, e.g.:
# from routers import investigate
# app.include_router(investigate.router, prefix="/api")
