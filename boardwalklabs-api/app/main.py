from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import Base, engine
from app.admin import router as admin_router
from app.routers.authors import router as authors_router
from app.routers.changelog import router as changelog_router
from app.routers.posts import router as posts_router
from app.routers.upload import router as upload_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    with engine.begin() as conn:
        conn.execute(
            text(
                "ALTER TABLE authors ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(512)"
            )
        )
        conn.execute(
            text("UPDATE posts SET body = '[]'::jsonb WHERE body IS NULL")
        )
    yield


app = FastAPI(
    title="Boardwalk Labs API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts_router)
app.include_router(changelog_router)
app.include_router(authors_router)
app.include_router(upload_router)
app.include_router(admin_router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
