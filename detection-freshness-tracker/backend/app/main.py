from __future__ import annotations

import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import get_settings
from .db import init_db
from .routers import api, pages

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s [%(name)s] %(message)s")
logger = logging.getLogger("app")

settings = get_settings()

app = FastAPI(
    title="Detection Rule Freshness Tracker",
    description="Tracks SigmaHQ, Elastic detection-rules, and Splunk ESCU for coverage against recent CVEs and ATT&CK techniques.",
    version="0.1.0",
)

# Public read-only API - open CORS so other blue-team tooling/dashboards can consume it directly.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(api.router)
app.include_router(pages.router)

static_dir = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.on_event("startup")
def on_startup() -> None:
    # Idempotent - guards against the api container winning the race to
    # start before the worker container's first init_db() call.
    try:
        init_db()
    except Exception:  # noqa: BLE001
        logger.exception("init_db() failed on startup; the DB may not be reachable yet")


@app.get("/healthz", include_in_schema=False)
def healthz():
    return {"status": "ok"}
