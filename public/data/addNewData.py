import datetime
import os, json
import requests

from helper import getNthCombination


def getClearDate(date: str):
    d, m, y = date.split()
    d = d.replace("th", "").replace("st", "").replace("nd", "").replace("rd", "")

    return f"{d} {m} {y}"


def download_image(image):
    if not image or not image.startswith("http"):
        print("Image url invalid!\n")
        return 0

    try:
        r = requests.get(image)
        if r.status_code != 200:
            print(f"Failed to download image from {image}!\n")
            return 0
        return r.content
    except:
        print(f"Failed to download image from {image}!\n")
        return 0


# add the new datas
os.makedirs("new", exist_ok=True)
files = os.listdir("new")
currentLength = len(os.listdir("profiles"))
persons = []

for index, file in enumerate(files):
    if not file.endswith(".json"):
        print(f"Skipping {file} as it is not a json file")
        continue

    with open(f"new/{file}", "rb") as f:
        data = json.load(f)

    id = getNthCombination(currentLength + index)
    image = data["image"]
    ext = "jpg"
    if image:
        supported = ("png", "jpeg")
        ext = (
            image.split("/")[-1].split(".")[-1] if image.endswith(supported) else "jpg"
        )

    if image != 0:
        path = f"../photos/{id}.{ext}"
        if os.path.exists(path):
            print(f"---> {path.split('/')[-1]} already exists")
            raise Exception(f"`{path.split('/')[-1]}` already exists")
        else:
            image = download_image(image)
            with open(path, "wb") as f:
                f.write(image)

    age = data["age"]
    dob = data["dob"]
    bn = data["bn"]
    en = data["en"]
    date = data["date"]

    try:
        getClearDate(date)
    except Exception as e:
        print(f"---> Invalid Date: {date}")
        print(f"---> Format should be like: 18 July, 2024")
        raise e

    newData = {
        "id": id,
        "age": age,
        "dob": dob,
        "bn": bn,
        "en": en,
    }

    searchable = {
        "id": id,
        "name": {"bn": bn["name"], "en": en["name"]},
        "profession": {"bn": bn["profession"], "en": en["profession"]},
        "info": {"bn": bn["info"], "en": en["info"]},
        "date": date,
        "hasImage": 0,
    }
    persons.append(searchable)

    with open(f"profiles/{id}.json", "w", encoding="utf8") as f:
        json.dump(newData, f, ensure_ascii=False)

    try:
        os.remove(f"new/{file}")
        print(f"Removed new/{file}")
    except Exception as e:
        print(f"Failed to remove new/{file}: {e}")


with open("searchableData.json", "rb") as f:
    data = json.load(f)

data.extend(persons)

data = sorted(
    data,
    key=lambda x: datetime.datetime.strptime(getClearDate(x["date"]), "%d %B, %Y"),
)


# TODO: Merge New and Old

with open("searchableData.json", "w", encoding="utf8") as f:
    json.dump(data, f, ensure_ascii=False)

print(f"Current Profiles:", len(data))
