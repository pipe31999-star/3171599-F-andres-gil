import re
from decimal import Decimal


def is_valid_content_code(v: str) -> bool:
    return bool(re.match(r"^[A-Z]{3}-\d{4}$", v))


def normalize_rating(v: Decimal) -> Decimal:
    return v.quantize(Decimal("0.1"))
