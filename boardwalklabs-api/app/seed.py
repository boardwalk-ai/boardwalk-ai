"""Run: python -m app.seed  — idempotent sample data."""

from app.database import SessionLocal, engine, Base
from app.models import Author, ChangeItem, ChangelogEntry, Post

Base.metadata.create_all(bind=engine)
db = SessionLocal()

if not db.query(Author).first():
    a = Author(name="Leon T.", initials="LT", color="#e32400", bio="Founder @ Boardwalk Labs")
    db.add(a)
    db.flush()

    db.add(
        Post(
            slug="ferpa-ai-guide-for-districts",
            title="FERPA & AI: What School Districts Actually Need to Know",
            excerpt="A plain-language breakdown of FERPA compliance when adopting AI tools in K-12.",
            cat="EDUCATION",
            issue="004",
            read_time="10 min",
            date="Feb 27, 2026",
            featured=True,
            gradient="linear-gradient(135deg, #1a1f2e 0%, #0d1018 100%)",
            accent_color="#3d7cf5",
            published=True,
            author_id=a.id,
            body=[
                {"type": "h2", "text": "What FERPA actually says"},
                {
                    "type": "quote",
                    "text": "The FERPA risk isn't in the AI — it's in who holds the student data.",
                },
                {
                    "type": "p",
                    "text": "FERPA restricts how educational agencies share personally identifiable student records. When a district adopts an AI writing tool, the question isn't whether the tool is smart — it's whether student work passes through servers without a valid data-sharing agreement.",
                },
                {"type": "h3", "text": "The school official exception"},
                {
                    "type": "p",
                    "text": "Under 34 CFR § 99.31(a)(1), a district can designate a vendor as a 'school official' if the vendor performs a service the school would otherwise do itself, is under the district's direct control regarding data use, and only accesses records for the purpose stated in its contract.",
                },
            ],
        )
    )

    entry = ChangelogEntry(
        version="0.4",
        full_version="v0.4.0",
        date="April 2026",
        status="LATEST",
        summary="Voice matching, Polish mode, and a refreshed writing experience.",
        released_at=None,
    )
    db.add(entry)
    db.flush()
    for i, (t, txt) in enumerate(
        [
            ("new", "Voice & Polish mode — adjusts tone without changing meaning"),
            ("new", "Changelog page on the marketing site"),
            ("improved", "Editor performance on large documents"),
            ("fixed", "Paragraph breaks lost on copy-paste from Google Docs"),
        ]
    ):
        db.add(ChangeItem(entry_id=entry.id, order=i, type=t, text=txt))

    db.commit()
    print("Seed data created.")
else:
    print("Data already exists, skipping seed.")

db.close()
