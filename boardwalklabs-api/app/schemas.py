import datetime as _dt
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict


# ── Authors ──────────────────────────────────────────────────────────

class AuthorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    initials: str
    color: str
    bio: str = ""
    avatar_url: Optional[str] = None


class AuthorIn(BaseModel):
    name: str
    initials: str
    color: str = "#e32400"
    bio: str = ""
    avatar_url: Optional[str] = None


# ── Body blocks ──────────────────────────────────────────────────────

BodyBlock = dict[str, Any]


# ── Posts ────────────────────────────────────────────────────────────

class PostListItem(BaseModel):
    """Shape returned by GET /api/posts (no body)."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    excerpt: str = ""
    cat: str
    issue: str
    read_time: str
    date: str
    featured: bool
    gradient: str
    accent_color: str
    published: bool
    author: Optional[AuthorOut] = None
    created_at: _dt.datetime
    updated_at: _dt.datetime


class PostDetail(PostListItem):
    """Shape returned by GET /api/posts/:slug (includes body)."""
    body: list[BodyBlock] = []


class PostIn(BaseModel):
    slug: str
    title: str
    excerpt: str = ""
    cat: str = "COMPANY"
    issue: str = "001"
    read_time: str = "5 min"
    date: str = ""
    featured: bool = False
    gradient: str = "linear-gradient(135deg, #1a1f2e 0%, #0d1018 100%)"
    accent_color: str = "#3d7cf5"
    published: bool = False
    author_id: Optional[int] = None
    body: list[BodyBlock] = []


# ── Changelog ────────────────────────────────────────────────────────

class ChangeItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    type: str
    text: str
    order: int = 0


class ChangeItemIn(BaseModel):
    type: str = "new"
    text: str = ""
    order: int = 0


class ChangelogEntryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    version: str
    full_version: str
    date: str
    status: Optional[str] = None
    summary: str
    released_at: Optional[_dt.date] = None
    changes: list[ChangeItemOut] = []
    created_at: _dt.datetime


class ChangelogEntryIn(BaseModel):
    version: str
    full_version: str
    date: str = ""
    status: Optional[str] = None
    summary: str = ""
    released_at: Optional[_dt.date] = None
    changes: list[ChangeItemIn] = []
