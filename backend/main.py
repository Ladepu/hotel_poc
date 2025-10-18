from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models, crud
import os, httpx, json

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post('/api/search_hotels')
def search(payload: dict, db: Session = Depends(get_db)):
    destination = payload.get('destination')
    return crud.search_hotels(db, destination=destination)

@app.post('/api/book')
def book(payload: dict, db: Session = Depends(get_db)):
    try:
        booking = crud.create_booking(db, payload)
        return {'status':'success','booking_id': booking.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/api/ai_query')
async def ai_query(payload: dict):
    text = payload.get('text')
    if not text:
        raise HTTPException(status_code=400, detail='No text')
    # naive fallback extractor
    import re
    dest = None
    m = re.search(r'in ([A-Za-z ]+)', text)
    if m:
        dest = m.group(1).strip()
    return {'destination': dest}