import os
import asyncio
import aiohttp
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path
from typing import List, Dict

# Load environment variables
load_dotenv()

LOCAL = os.environ.get("LOCAL")
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.prod
users_collection = db["individual"]

async def download_image(session: aiohttp.ClientSession, user: Dict, photos_dir: Path) -> tuple:
    user_id = str(user["id"])
    image_url: str = user.get("image")
    image_path = photos_dir / f"{user_id}.jpg"

    # Skip if image is default or already exists
    if image_url.endswith("default.jpg") or (image_path.exists() and LOCAL):
        return "skipped", user_id, None

    if not image_url:
        return "failed", user_id, "No image URL"

    try:
        async with session.get(image_url, timeout=10) as response:
            if response.status != 200:
                return "failed", user_id, f"HTTP {response.status}"
            
            image_data = await response.read()
            
            # Save the image
            async with aiohttp.StreamWriter(image_path.open('wb')) as writer:
                await writer.write(image_data)

            return "downloaded", user_id, None

    except Exception as e:
        return "failed", user_id, str(e)

async def download_missing_images():
    # Create photos directory if it doesn't exist
    photos_dir = Path("public/photos")
    # photos_dir.mkdir(parents=True, exist_ok=True)

    # Get all users with image field
    users = list(users_collection.find({"image": {"$exists": True}}))

    # Statistics
    stats = {
        "downloaded": 0,
        "failed": 0,
        "skipped": 0
    }

    # Create session for all requests
    async with aiohttp.ClientSession() as session:
        # Create tasks for all downloads
        tasks = [download_image(session, user, photos_dir) for user in users]
        
        # Process in chunks of 20 concurrent downloads
        chunk_size = 20
        for i in range(0, len(tasks), chunk_size):
            chunk = tasks[i:i + chunk_size]
            results = await asyncio.gather(*chunk)
            
            # Process results
            for status, user_id, error in results:
                if status == "downloaded":
                    stats["downloaded"] += 1
                    print(f"✅ Downloaded image for user {user_id}")
                elif status == "failed":
                    stats["failed"] += 1
                    print(f"❌ Failed to download image for user {user_id}: {error}")
                else:  # skipped
                    stats["skipped"] += 1

    # Print summary
    print("\nDownload Summary:")
    print(f"Downloaded: {stats['downloaded']}")
    print(f"Failed: {stats['failed']}")
    print(f"Skipped (already exists): {stats['skipped']}")
    print(f"Total processed: {sum(stats.values())}")

def main():
    # Create event loop and run the async function
    asyncio.run(download_missing_images())

if __name__ == "__main__":
    main()