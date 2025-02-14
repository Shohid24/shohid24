from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def clean_individual_birthPlace():
    try:
        # Connect to MongoDB
        client = MongoClient(os.getenv("MONGO_URI"))
        db = client["prod"]
        collection = db["individual"]

        # Fetch all documents
        documents = [*collection.find({})]

        # Counter for updated documents
        update_count = 0

        # Process each document
        for doc in documents:
            updates = {}

            # Check and clean en.birthPlace
            if "en" in doc and "birthPlace" in doc["en"]:
                original_birthPlace = doc["en"]["birthPlace"]
                cleaned_birthPlace = original_birthPlace.rstrip(".").rstrip("।")
                if original_birthPlace != cleaned_birthPlace:
                    updates["en.birthPlace"] = cleaned_birthPlace

            # Check and clean bn.birthPlace
            if "bn" in doc and "birthPlace" in doc["bn"]:
                original_birthPlace = doc["bn"]["birthPlace"]
                cleaned_birthPlace = original_birthPlace.rstrip("।").rstrip(".")
                if original_birthPlace != cleaned_birthPlace:
                    updates["bn.birthPlace"] = cleaned_birthPlace

            # Remove __v if present
            if "__v" in doc:
                if not updates:
                    result = collection.update_one(
                        {"_id": doc["_id"]}, {"$unset": {"__v": ""}}
                    )
                else:
                    result = collection.update_one(
                        {"_id": doc["_id"]}, {"$set": updates, "$unset": {"__v": ""}}
                    )
            elif updates:
                result = collection.update_one({"_id": doc["_id"]}, {"$set": updates})

            if updates or "__v" in doc:
                update_count += 1
                print(f"Updated document with ID: {doc.get('id')}")

        print(f"Successfully updated {update_count} documents")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        # Close the connection
        if "client" in locals():
            client.close()


if __name__ == "__main__":
    clean_individual_birthPlace()
