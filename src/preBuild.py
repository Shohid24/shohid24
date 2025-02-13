import os, datetime

os.system("python public/downloadImages.py")
os.system("python public/compressImages.py")


import json
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from.env file


MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.prod
users_collection = db["individual"]  # Adjust collection name as needed


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
            "hasImage": "default.jpg" not in user.get("image", ""),
        }
        for user in users
    ]

    file_path = os.path.join(os.getcwd(), "public/data/searchableData.json")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    data = sorted(
        searchable_data, key=lambda x: datetime.datetime.strptime(x["date"], "%d/%m/%Y")
    )

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("✅ searchableData.json has been fetched!")


if __name__ == "__main__":
    fetch_data()
