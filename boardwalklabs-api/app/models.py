from datetime import date, datetime

from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from app.database import Base


class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    initials = Column(String(10), nullable=False)
    color = Column(String(20), nullable=False, default="#e32400")
    bio = Column(Text, nullable=False, default="")
    avatar_url = Column(String(512), nullable=True)

    posts = relationship("Post", back_populates="author", lazy="selectin")


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)
    slug = Column(String(300), unique=True, nullable=False, index=True)
    title = Column(String(500), nullable=False)
    excerpt = Column(Text, nullable=False, default="")
    cat = Column(String(30), nullable=False, default="COMPANY")
    issue = Column(String(10), nullable=False, default="001")
    read_time = Column(String(20), nullable=False, default="5 min")
    date = Column(String(60), nullable=False, default="")
    featured = Column(Boolean, nullable=False, default=False)
    gradient = Column(
        String(300),
        nullable=False,
        default="linear-gradient(135deg, #1a1f2e 0%, #0d1018 100%)",
    )
    accent_color = Column(String(20), nullable=False, default="#3d7cf5")
    published = Column(Boolean, nullable=False, default=False)
    body = Column(JSONB, nullable=False, default=list)

    author_id = Column(Integer, ForeignKey("authors.id"), nullable=True)
    author = relationship("Author", back_populates="posts", lazy="joined")

    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )


class ChangelogEntry(Base):
    __tablename__ = "changelog_entries"

    id = Column(Integer, primary_key=True)
    version = Column(String(30), nullable=False)
    full_version = Column(String(30), unique=True, nullable=False, index=True)
    date = Column(String(60), nullable=False, default="")
    status = Column(String(20), nullable=True)
    summary = Column(Text, nullable=False, default="")
    released_at = Column(Date, nullable=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    changes = relationship(
        "ChangeItem",
        back_populates="entry",
        lazy="selectin",
        order_by="ChangeItem.order",
        cascade="all, delete-orphan",
    )


class ChangeItem(Base):
    __tablename__ = "change_items"

    id = Column(Integer, primary_key=True)
    entry_id = Column(
        Integer, ForeignKey("changelog_entries.id", ondelete="CASCADE"), nullable=False
    )
    order = Column(Integer, nullable=False, default=0)
    type = Column(String(20), nullable=False, default="new")
    text = Column(Text, nullable=False, default="")

    entry = relationship("ChangelogEntry", back_populates="changes")
