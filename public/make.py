import json, os

with open("data.json", "rb") as f:
    data = json.load(f)


shortData = []
for person in data:
    id = person["id"]
    name = person["name"]
    profession = person["profession"]
    info = person["info"]
    date = person["date"]
    
    exists = False
    if os.path.exists(f"photos/{id}.jpg"):
        exists = True

    short = [
        id,
        name,
        profession,
        info,
        date,
        int(exists),
    ]  # last `1` means that the image exists

    shortData.append(short)

with open("shortData.json", "w", encoding="utf-8") as f:
    json.dump(shortData, f, ensure_ascii=False, indent=None)
