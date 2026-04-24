from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import require_admin
from app.database import get_db
from app.models import Author
from app.schemas import AuthorIn, AuthorOut

router = APIRouter(prefix="/api/authors", tags=["authors"])


@router.get("", response_model=list[AuthorOut])
def list_authors(db: Session = Depends(get_db)):
    return db.query(Author).order_by(Author.id).all()


@router.post("", response_model=AuthorOut, dependencies=[Depends(require_admin)])
def create_author(data: AuthorIn, db: Session = Depends(get_db)):
    author = Author(**data.model_dump())
    db.add(author)
    db.commit()
    db.refresh(author)
    return author


@router.put("/{author_id}", response_model=AuthorOut, dependencies=[Depends(require_admin)])
def update_author(author_id: int, data: AuthorIn, db: Session = Depends(get_db)):
    author = db.query(Author).get(author_id)
    if not author:
        raise HTTPException(404, "Author not found")
    for k, v in data.model_dump().items():
        setattr(author, k, v)
    db.commit()
    db.refresh(author)
    return author
