from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def clean_individual_info():
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
            
            # Check and clean en.info
            if 'en' in doc and 'info' in doc['en']:
                original_info = doc['en']['info']
                cleaned_info = original_info.rstrip('.').rstrip('।')
                if original_info != cleaned_info:
                    updates['en.info'] = cleaned_info
            
            # Check and clean bn.info
            if 'bn' in doc and 'info' in doc['bn']:
                original_info = doc['bn']['info']
                cleaned_info = original_info.rstrip('।').rstrip('.')
                if original_info != cleaned_info:
                    updates['bn.info'] = cleaned_info
            
            # Remove __v if present
            if '__v' in doc:
                if not updates:
                    result = collection.update_one(
                        {"_id": doc["_id"]},
                        {"$unset": {"__v": ""}}
                    )
                else:
                    result = collection.update_one(
                        {"_id": doc["_id"]},
                        {
                            "$set": updates,
                            "$unset": {"__v": ""}
                        }
                    )
            elif updates:
                result = collection.update_one(
                    {"_id": doc["_id"]},
                    {"$set": updates}
                )
            
            if updates or '__v' in doc:
                update_count += 1
                print(f"Updated document with ID: {doc.get('_id')}")

        print(f"Successfully updated {update_count} documents")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        # Close the connection
        if "client" in locals():
            client.close()

if __name__ == "__main__":
    clean_individual_info()