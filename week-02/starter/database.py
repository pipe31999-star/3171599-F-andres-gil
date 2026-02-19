from typing import List, Optional, Dict, Any
from datetime import datetime

_db: List[Dict[str, Any]] = []
_next_id = 1


def _get_next_id() -> int:
    global _next_id
    nid = _next_id
    _next_id += 1
    return nid


def reset_db() -> None:
    global _db, _next_id
    _db = []
    _next_id = 1


def list_media(skip: int = 0, limit: int = 10, genre: Optional[str] = None, language: Optional[str] = None, is_active: Optional[bool] = None) -> List[Dict[str, Any]]:
    items = _db
    if genre is not None:
        items = [i for i in items if i.get("genre") == genre]
    if language is not None:
        items = [i for i in items if i.get("language") == language]
    if is_active is not None:
        items = [i for i in items if i.get("is_active") == is_active]
    return items[skip: skip + limit]


def get_media_by_id(media_id: int) -> Optional[Dict[str, Any]]:
    for i in _db:
        if i.get("id") == media_id:
            return i
    return None


def get_media_by_content_code(code: str) -> Optional[Dict[str, Any]]:
    for i in _db:
        if i.get("content_code") == code:
            return i
    return None


def create_media(data: Dict[str, Any]) -> Dict[str, Any]:
    # uniqueness check
    if get_media_by_content_code(data["content_code"]):
        raise ValueError("content_code must be unique")
    item = data.copy()
    item["id"] = _get_next_id()
    item["created_at"] = datetime.utcnow()
    item["updated_at"] = None
    _db.append(item)
    return item


def update_media(media_id: int, patch: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    item = get_media_by_id(media_id)
    if not item:
        return None
    # if content_code is being changed, ensure uniqueness
    if "content_code" in patch and patch["content_code"] != item.get("content_code"):
        if get_media_by_content_code(patch["content_code"]):
            raise ValueError("content_code must be unique")
    for k, v in patch.items():
        if v is not None:
            item[k] = v
    item["updated_at"] = datetime.utcnow()
    return item


def delete_media(media_id: int) -> bool:
    global _db
    for idx, i in enumerate(_db):
        if i.get("id") == media_id:
            _db.pop(idx)
            return True
    return False
