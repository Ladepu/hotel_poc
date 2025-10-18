from database import SessionLocal, engine
from models import Base, Hotel

Base.metadata.create_all(bind=engine)

def seed_hotels():
    db = SessionLocal()
    hotels = [
        Hotel(name="Beachside Resort", destination="Miami", rating=4.5, price=180, image_url="https://picsum.photos/seed/beach/800/600"),
        Hotel(name="City Comfort Inn", destination="New York", rating=4.0, price=220, image_url="https://picsum.photos/seed/ny/800/600"),
        Hotel(name="Mountain Escape", destination="Denver", rating=4.8, price=150, image_url="https://picsum.photos/seed/mountain/800/600"),
        Hotel(name="Desert Oasis", destination="Phoenix", rating=4.3, price=130, image_url="https://picsum.photos/seed/desert/800/600"),
        Hotel(name="Tropical Paradise", destination="Honolulu", rating=5.0, price=300, image_url="https://picsum.photos/seed/paradise/800/600"),
    ]
    db.add_all(hotels)
    db.commit()
    db.close()
    print("🌴 Seeded hotel data successfully!")

if __name__ == '__main__':
    seed_hotels()