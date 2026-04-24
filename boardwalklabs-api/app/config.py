import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://labsuser:labspass@labs-db:5432/labsdb",
)
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "changeme-boardwalk-2026")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/app/uploads")
UPLOAD_URL_PREFIX = os.getenv("UPLOAD_URL_PREFIX", "/api/uploads")
MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "10"))
