from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Hotel(Base):
    __tablename__ = 'hotels'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    image_url = Column(String)

class Booking(Base):
    __tablename__ = 'bookings'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=True)
    hotel_id = Column(Integer, ForeignKey('hotels.id'))
    destination = Column(String, nullable=False)
    check_in = Column(String)
    check_out = Column(String)
    num_guests = Column(Integer)
    total_price = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
