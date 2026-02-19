from __future__ import annotations
from enum import Enum
from typing import Optional
from datetime import datetime, date
from decimal import Decimal, ROUND_HALF_UP
import re

from pydantic import BaseModel, Field, field_validator


class GenreEnum(str, Enum):
    ACTION = "action"
    DRAMA = "drama"
    COMEDY = "comedy"
    DOCUMENTARY = "documentary"
    HORROR = "horror"
    ROMANCE = "romance"
    SCI_FI = "sci-fi"
    ANIMATION = "animation"


class MediaBase(BaseModel):
    content_code: str = Field(..., description="Unique content code like MOV-1234")
    title: str = Field(..., min_length=2, max_length=200)
    description: Optional[str] = None
    genre: GenreEnum
    duration_minutes: int = Field(..., ge=1)
    release_date: date
    rating: Decimal = Field(..., description="0.0 - 10.0, one decimal place")
    language: str = Field(..., min_length=2, max_length=2)
    is_active: bool = Field(default=True)

    @field_validator("content_code")
    def validate_content_code(cls, v: str) -> str:
        # Format: 3 uppercase letters + '-' + 4 digits e.g. MOV-1234
        if not re.match(r"^[A-Z]{3}-\d{4}$", v):
            raise ValueError("content_code must match format: AAA-1234")
        return v

    @field_validator("language")
    def validate_language(cls, v: str) -> str:
        if not re.match(r"^[a-z]{2}$", v.lower()):
            raise ValueError("language must be ISO 639-1 two-letter code")
        return v.lower()

    @field_validator("rating")
    def validate_rating(cls, v: Decimal) -> Decimal:
        # Normalize to one decimal place and enforce 0.0 - 10.0
        try:
            quant = v.quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
        except Exception:
            quant = Decimal(str(v)).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
        if quant < Decimal("0.0") or quant > Decimal("10.0"):
            raise ValueError("rating must be between 0.0 and 10.0")
        return quant


class MediaCreate(MediaBase):
    pass


class MediaUpdate(BaseModel):
    content_code: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[GenreEnum] = None
    duration_minutes: Optional[int] = None
    release_date: Optional[date] = None
    rating: Optional[Decimal] = None
    language: Optional[str] = None
    is_active: Optional[bool] = None

    @field_validator("content_code")
    def validate_content_code(cls, v: str) -> str:
        if not re.match(r"^[A-Z]{3}-\d{4}$", v):
            raise ValueError("content_code must match format: AAA-1234")
        return v

    @field_validator("language")
    def validate_language(cls, v: str) -> str:
        if not re.match(r"^[a-z]{2}$", v.lower()):
            raise ValueError("language must be ISO 639-1 two-letter code")
        return v.lower()

    @field_validator("rating")
    def validate_rating(cls, v: Decimal) -> Decimal:
        try:
            quant = v.quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
        except Exception:
            quant = Decimal(str(v)).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
        if quant < Decimal("0.0") or quant > Decimal("10.0"):
            raise ValueError("rating must be between 0.0 and 10.0")
        return quant


class MediaOut(MediaBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
