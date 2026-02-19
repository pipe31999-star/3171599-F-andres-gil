# Streaming Platform - Semana 02

Proyecto de ejemplo: API CRUD para una Plataforma de Streaming de Video.

Run locally:

```bash
python -m pip install -r starter/requirements.txt
uvicorn starter.main:app --reload
```

Endpoints:
- `POST /media/` create
- `GET /media/?skip=0&limit=10&genre=action&language=en` list with pagination/filters
- `GET /media/{id}` get by id
- `GET /media/by-content-code/{code}` get by unique code
- `PATCH /media/{id}` partial update
- `DELETE /media/{id}` delete

Notes:
- Unique field: `content_code` (format AAA-1234)
- Models use Pydantic v2 validators
