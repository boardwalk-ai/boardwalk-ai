from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import set_committed_value

from app.auth import require_admin
from app.database import get_db
from app.models import Post
from app.schemas import PostDetail, PostIn, PostListItem

router = APIRouter(prefix="/api/posts", tags=["posts"])


@router.get("", response_model=list[PostListItem])
def list_posts(
    category: Optional[str] = Query(None),
    published_only: bool = Query(True),
    db: Session = Depends(get_db),
):
    q = db.query(Post)
    if published_only:
        q = q.filter(Post.published.is_(True))
    if category:
        q = q.filter(Post.cat == category.upper())
    return q.order_by(Post.featured.desc(), Post.created_at.desc()).all()


@router.get("/{slug}", response_model=PostDetail)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(404, "Post not found")
    if post.body is None:
        set_committed_value(post, "body", [])
    return post


@router.post("", response_model=PostDetail, dependencies=[Depends(require_admin)])
def create_post(data: PostIn, db: Session = Depends(get_db)):
    if db.query(Post).filter(Post.slug == data.slug).first():
        raise HTTPException(409, "Slug already exists")
    if data.featured:
        db.query(Post).filter(Post.featured.is_(True)).update({"featured": False})
    post = Post(**data.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/{slug}", response_model=PostDetail, dependencies=[Depends(require_admin)])
def update_post(slug: str, data: PostIn, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(404, "Post not found")
    if data.featured and not post.featured:
        db.query(Post).filter(Post.featured.is_(True), Post.id != post.id).update(
            {"featured": False}
        )
    for k, v in data.model_dump().items():
        setattr(post, k, v)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/{slug}", dependencies=[Depends(require_admin)])
def delete_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(404, "Post not found")
    db.delete(post)
    db.commit()
    return {"ok": True}
