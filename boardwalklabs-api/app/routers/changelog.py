from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.auth import require_admin
from app.database import get_db
from app.models import ChangeItem, ChangelogEntry
from app.schemas import (
    ChangeItemIn,
    ChangeItemOut,
    ChangelogEntryIn,
    ChangelogEntryOut,
)

router = APIRouter(prefix="/api/changelog", tags=["changelog"])


@router.get("", response_model=list[ChangelogEntryOut])
def list_changelog(
    filter: Optional[str] = Query(None, description="new|improved|fixed"),
    db: Session = Depends(get_db),
):
    entries = (
        db.query(ChangelogEntry)
        .order_by(ChangelogEntry.released_at.desc().nullslast(), ChangelogEntry.id.desc())
        .all()
    )
    if filter:
        allowed = {t.strip().lower() for t in filter.split(",")}
        for e in entries:
            e.changes = [c for c in e.changes if c.type in allowed]
    return entries


@router.get("/{full_version}", response_model=ChangelogEntryOut)
def get_entry(full_version: str, db: Session = Depends(get_db)):
    entry = (
        db.query(ChangelogEntry)
        .filter(ChangelogEntry.full_version == full_version)
        .first()
    )
    if not entry:
        raise HTTPException(404, "Changelog entry not found")
    return entry


@router.post("", response_model=ChangelogEntryOut, dependencies=[Depends(require_admin)])
def create_entry(data: ChangelogEntryIn, db: Session = Depends(get_db)):
    if (
        db.query(ChangelogEntry)
        .filter(ChangelogEntry.full_version == data.full_version)
        .first()
    ):
        raise HTTPException(409, "full_version already exists")
    entry = ChangelogEntry(
        version=data.version,
        full_version=data.full_version,
        date=data.date,
        status=data.status,
        summary=data.summary,
        released_at=data.released_at,
    )
    db.add(entry)
    db.flush()
    for i, c in enumerate(data.changes):
        db.add(
            ChangeItem(entry_id=entry.id, order=c.order or i, type=c.type, text=c.text)
        )
    db.commit()
    db.refresh(entry)
    return entry


@router.put(
    "/{full_version}",
    response_model=ChangelogEntryOut,
    dependencies=[Depends(require_admin)],
)
def update_entry(
    full_version: str, data: ChangelogEntryIn, db: Session = Depends(get_db)
):
    entry = (
        db.query(ChangelogEntry)
        .filter(ChangelogEntry.full_version == full_version)
        .first()
    )
    if not entry:
        raise HTTPException(404, "Changelog entry not found")
    entry.version = data.version
    entry.full_version = data.full_version
    entry.date = data.date
    entry.status = data.status
    entry.summary = data.summary
    entry.released_at = data.released_at
    db.query(ChangeItem).filter(ChangeItem.entry_id == entry.id).delete()
    for i, c in enumerate(data.changes):
        db.add(
            ChangeItem(entry_id=entry.id, order=c.order or i, type=c.type, text=c.text)
        )
    db.commit()
    db.refresh(entry)
    return entry


@router.post(
    "/{entry_id}/changes",
    response_model=ChangeItemOut,
    dependencies=[Depends(require_admin)],
)
def add_change(entry_id: int, data: ChangeItemIn, db: Session = Depends(get_db)):
    entry = db.query(ChangelogEntry).get(entry_id)
    if not entry:
        raise HTTPException(404, "Changelog entry not found")
    max_order = max((c.order for c in entry.changes), default=-1)
    item = ChangeItem(
        entry_id=entry_id, order=data.order or max_order + 1, type=data.type, text=data.text
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete(
    "/{entry_id}/changes/{change_id}", dependencies=[Depends(require_admin)]
)
def delete_change(entry_id: int, change_id: int, db: Session = Depends(get_db)):
    item = (
        db.query(ChangeItem)
        .filter(ChangeItem.id == change_id, ChangeItem.entry_id == entry_id)
        .first()
    )
    if not item:
        raise HTTPException(404, "Change item not found")
    db.delete(item)
    db.commit()
    return {"ok": True}
