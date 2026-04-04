from fastapi import FastAPI, APIRouter, Depends, HTTPException, UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel, Field, select
import os
import logging
from pathlib import Path
from pydantic import ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import vercel_blob
from video_proxy import router as video_router


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# PostgreSQL connection (Vercel Postgres URL starts with postgres://, need to use postgresql+asyncpg://)
DATABASE_URL = os.environ.get('POSTGRES_URL', '').replace('postgres://', 'postgresql+asyncpg://')
if not DATABASE_URL:
    # Fallback for local development
    DATABASE_URL = "sqlite+aiosqlite:///./test.db"

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# Base Models
class StatusCheck(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPost(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str
    content: str
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GalleryImage(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    url: str
    caption: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Main app setup
app = FastAPI()
api_router = APIRouter(prefix="/api")


# Create Database tables (for demo/local development, in production Vercel might handle migrations)
@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


# Dependency code for getting session
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

@api_router.get("/")
async def root():
    return {"message": "Hello to Rannaghar's SQL Backend"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input_name: str, session: AsyncSession = Depends(get_session)):
    status_obj = StatusCheck(client_name=input_name)
    session.add(status_obj)
    await session.commit()
    await session.refresh(status_obj)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(session: AsyncSession = Depends(get_session)):
    statement = select(StatusCheck).order_by(StatusCheck.timestamp.desc())
    results = await session.execute(statement)
    return results.scalars().all()


# Blog Routes
@api_router.get("/blogs", response_model=List[BlogPost])
async def get_blogs(session: AsyncSession = Depends(get_session)):
    statement = select(BlogPost).order_by(BlogPost.created_at.desc())
    results = await session.execute(statement)
    return results.scalars().all()

@api_router.post("/blogs", response_model=BlogPost)
async def create_blog(title: str, content: str, image_url: Optional[str] = None, session: AsyncSession = Depends(get_session)):
    new_blog = BlogPost(title=title, content=content, image_url=image_url)
    session.add(new_blog)
    await session.commit()
    await session.refresh(new_blog)
    return new_blog


# Gallery & Vercel Blob Routes
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery(session: AsyncSession = Depends(get_session)):
    statement = select(GalleryImage).order_by(GalleryImage.created_at.desc())
    results = await session.execute(statement)
    return results.scalars().all()

@api_router.post("/gallery/upload")
async def upload_gallery_image(caption: Optional[str] = None, file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    try:
        # Upload to Vercel Blob
        content = await file.read()
        blob_url = vercel_blob.put(file.filename, content, {"access": "public"})
        
        # Save record in Postgres
        new_img = GalleryImage(url=blob_url["url"], caption=caption)
        session.add(new_img)
        await session.commit()
        await session.refresh(new_img)
        return new_img
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Include Routers
app.include_router(api_router)
app.include_router(video_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    await engine.dispose()