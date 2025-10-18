#!/bin/bash
set -e
echo "📦 Creating database tables..."
python3 -c "from database import Base, engine; from models import *; Base.metadata.create_all(bind=engine)"
echo "🌱 Seeding sample hotel data..."
python3 seed_hotels.py
echo "✅ Database initialization complete!"
