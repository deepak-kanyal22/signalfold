from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    status: str
    message: str


@router.get("/health", response_model=HealthResponse, summary="Health check")
async def health_check() -> HealthResponse:
    """
    Returns a simple health status. Use this to verify that the backend
    is running and reachable from the frontend.
    """
    return HealthResponse(status="ok", message="SignalFold backend is running")
