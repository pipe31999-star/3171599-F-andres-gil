from fastapi import FastAPI, HTTPException, Query
from typing import List, Optional
from decimal import Decimal

from .models import MediaCreate, MediaOut, MediaUpdate
from . import database as db

app = FastAPI(title="Streaming Platform API - Media CRUD")


@app.post("/media/", response_model=MediaOut, status_code=201)
def create_media(payload: MediaCreate):
    try:
        item = db.create_media(payload.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return MediaOut(**item)


@app.get("/media/", response_model=List[MediaOut])
def list_media(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1), genre: Optional[str] = None, language: Optional[str] = None, is_active: Optional[bool] = None):
    items = db.list_media(skip=skip, limit=limit, genre=genre, language=language, is_active=is_active)
    return [MediaOut(**i) for i in items]


@app.get("/media/{media_id}", response_model=MediaOut)
def get_media(media_id: int):
    item = db.get_media_by_id(media_id)
    if not item:
        raise HTTPException(status_code=404, detail="Media not found")
    return MediaOut(**item)


@app.get("/media/by-content-code/{code}", response_model=MediaOut)
def get_by_code(code: str):
    item = db.get_media_by_content_code(code)
    if not item:
        raise HTTPException(status_code=404, detail="Media not found")
    return MediaOut(**item)


@app.patch("/media/{media_id}", response_model=MediaOut)
def patch_media(media_id: int, payload: MediaUpdate):
    try:
        patched = db.update_media(media_id, {k: v for k, v in payload.model_dump().items() if v is not None})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if not patched:
        raise HTTPException(status_code=404, detail="Media not found")
    return MediaOut(**patched)


@app.delete("/media/{media_id}", status_code=204)
def delete_media(media_id: int):
    ok = db.delete_media(media_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Media not found")
    return None
