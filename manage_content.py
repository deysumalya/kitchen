import asyncio
import os
from datetime import datetime, timezone
import uuid
from pathlib import Path
from dotenv import load_dotenv
from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import Optional

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / 'backend' / '.env')

# Database Setup (Sync for simpler script execution)
DATABASE_URL = os.environ.get('POSTGRES_URL', '').replace('postgres://', 'postgresql://')
if not DATABASE_URL:
    # Use sync sqlite for local scripts if postgres is not set
    DATABASE_URL = "sqlite:///./backend/test.db"

engine = create_engine(DATABASE_URL)

# Models (Duplicated for standalone script)
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

def add_blog(title: str, content: str, image_url: Optional[str] = None):
    with Session(engine) as session:
        new_blog = BlogPost(title=title, content=content, image_url=image_url)
        session.add(new_blog)
        session.commit()
        print(f"Successfully added blog: {title}")

def add_image(url: str, caption: Optional[str] = None):
    with Session(engine) as session:
        new_img = GalleryImage(url=url, caption=caption)
        session.add(new_img)
        session.commit()
        print(f"Successfully added image with caption: {caption}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python manage_content.py blog 'Title' 'Content' ['image_url']")
        print("       python manage_content.py image 'URL' ['Caption']")
        sys.exit(1)
        
    cmd = sys.argv[1].lower()
    if cmd == "blog":
        title = sys.argv[2]
        content = sys.argv[3]
        img_url = sys.argv[4] if len(sys.argv) > 4 else None
        add_blog(title, content, img_url)
    elif cmd == "image":
        url = sys.argv[2]
        caption = sys.argv[3] if len(sys.argv) > 3 else None
        add_image(url, caption)
    else:
        print("Unknown command.")
