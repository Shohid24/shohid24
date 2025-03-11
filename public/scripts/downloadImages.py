import os
import sys
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Load
load_dotenv()
sys.stdout.reconfigure(encoding='utf-8')

LOCAL = os.environ.get("LOCAL")
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.prod
users_collection = db["individual"]
ses = requests.Session()


def download_missing_images():
    # Create photos directory if it doesn't exist
    photos_dir = Path("public/photos")
    # photos_dir.mkdir(parents=True, exist_ok=True)

    # Get all users with image field
    users = users_collection.find({"image": {"$exists": True}})

    downloaded_count = 0
    failed_count = 0
    skipped_count = 0

    for user in users:
        user_id = str(user["id"])
        image_url: str = user.get("image")
        if image_url.endswith("default.jpg"):
            continue
        image_path = photos_dir / f"{user_id}.jpg"

        # Skip if image already exists
        # TODO: Add different logic so you don't need to download all of them
        if image_path.exists() and LOCAL:
            skipped_count += 1
            continue

        if not image_url:
            continue

        try:
            # Download the image
            response = ses.get(image_url, timeout=10)
            response.raise_for_status()  # Raise exception for bad status codes

            # Save the image
            with open(image_path, "wb") as f:
                f.write(response.content)

            downloaded_count += 1
            print(f"✅ Downloaded image for user {user_id}")

        except Exception as e:
            failed_count += 1
            print(f"❌ Failed to download image for user {user_id}: {str(e)}")

    # Print summary
    print("\nDownload Summary:")
    print(f"Downloaded: {downloaded_count}")
    print(f"Failed: {failed_count}")
    print(f"Skipped (already exists): {skipped_count}")
    print(f"Total processed: {downloaded_count + failed_count + skipped_count}")


if __name__ == "__main__":
    download_missing_images()
