import os
from datetime import datetime

os.system("python -m pip install pymongo python-dotenv pillow")
import json
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from.env file

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.prod
users_collection = db["individual"]  # Adjust collection name as needed


def parse_date(date_str):
    """Convert date string to datetime object, handling potential errors"""
    try:
        return datetime.strptime(date_str, "%d/%m/%Y")
    except (ValueError, TypeError):
        # Return a minimum date for sorting purposes if date is invalid or missing
        return datetime.min


def fetch_data():
    users = list(users_collection.find({}))
    searchable_data = [
        {
            "id": str(user["id"]),
            "name": {
                "bn": user["bn"]["name"],
                "en": user["en"]["name"],
            },
            "profession": {
                "bn": user["bn"]["profession"],
                "en": user["en"]["profession"],
            },
            "info": {
                "bn": user["bn"]["info"],
                "en": user["en"]["info"],
            },
            "date": user.get("date"),
            "hasImage": user.get("hasImage", False),
        }
        for user in users
    ]

    # Sort the data by date
    searchable_data.sort(key=lambda x: parse_date(x["date"]), reverse=True)

    file_path = os.path.join(os.getcwd(), "public/data/searchableData.json")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(searchable_data, f, indent=2, ensure_ascii=False)

    print("✅ searchableData.json has been fetched and sorted by date!")


if __name__ == "__main__":
    fetch_data()
