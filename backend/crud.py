from sqlalchemy.orm import Session
import models
def search_hotels(db: Session, destination: str = None):
    q = db.query(models.Hotel)
    if destination:
        q = q.filter(models.Hotel.destination.ilike(f"%{destination}%"))
    return q.limit(50).all()

def create_booking(db: Session, data: dict):
    booking = models.Booking(**data)
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking
