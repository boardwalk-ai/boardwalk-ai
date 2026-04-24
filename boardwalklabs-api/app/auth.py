from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.config import ADMIN_TOKEN

_bearer = HTTPBearer(auto_error=False)


def require_admin(
    creds: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
):
    if creds is None or creds.credentials != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing admin token",
        )
