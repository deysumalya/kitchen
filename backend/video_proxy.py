from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import httpx
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/video", tags=["video"])

# Video URLs
WELCOME_VIDEO_URL = "https://customer-assets.emergentagent.com/job_51748072-d3a9-4e11-81ea-349df3f9a9ea/artifacts/j5snnush_WhatsApp%20Video%202026-04-04%20at%203.48.23%20PM%20%281%29.mp4"
MAIN_VIDEO_URL = "https://customer-assets.emergentagent.com/job_51748072-d3a9-4e11-81ea-349df3f9a9ea/artifacts/qzo32wn2_km_20260404_720p_60f_20260404_195649.mp4"

async def video_streamer(url: str):
    """Stream video content from external URL"""
    async with httpx.AsyncClient(timeout=30.0) as client:
        async with client.stream("GET", url) as response:
            async for chunk in response.aiter_bytes(chunk_size=65536):
                yield chunk

@router.get("/welcome")
async def get_welcome_video():
    """Proxy welcome video"""
    try:
        return StreamingResponse(
            video_streamer(WELCOME_VIDEO_URL),
            media_type="video/mp4",
            headers={
                "Accept-Ranges": "bytes",
                "Content-Disposition": "inline"
            }
        )
    except Exception as e:
        logger.error(f"Error streaming welcome video: {e}")
        raise HTTPException(status_code=500, detail="Failed to stream video")

@router.get("/main")
async def get_main_video():
    """Proxy main video"""
    try:
        return StreamingResponse(
            video_streamer(MAIN_VIDEO_URL),
            media_type="video/mp4",
            headers={
                "Accept-Ranges": "bytes",
                "Content-Disposition": "inline"
            }
        )
    except Exception as e:
        logger.error(f"Error streaming main video: {e}")
        raise HTTPException(status_code=500, detail="Failed to stream video")
