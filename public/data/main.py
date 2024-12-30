import os, json
from getID import getNthCombination

with open("searchableData.json", "rb") as f:
    data = json.load(f)

with open("rawData.json", "rb") as f:
    rawData = json.load(f)


def sanitizeText(text, lang="en"):
    text = " ".join(text.split())
    text = text.replace("\n", ", ").strip()

    if text and not text.endswith((".", "।")):
        text += "." if lang == "en" else "।"

    return (text[0] + text[1:]) if text else text


def pprint(text):
    print(json.dumps(text, indent=2, ensure_ascii=False))


def cleanup(data, lang="en"):
    name = data["name"]
    birthPlace = data["bornAddress"]
    profession = data["educationOrWork"]
    bio = data["biography"]
    cause = data["howToDeath"]
    shortCause = cause["short"]
    longCause = cause["long"]
    return {
        "name": sanitizeText(name, lang),
        "birthPlace": sanitizeText(birthPlace, lang),
        "profession": sanitizeText(profession, lang),
        "bio": sanitizeText(bio, lang),
        "cause": sanitizeText(shortCause, lang) + "\n" + sanitizeText(longCause, lang),
    }


os.makedirs("profiles", exist_ok=True)

for i in range(len(rawData)):
    id = data[i]["id"]
    raw = rawData[i]
    age = raw.get("age", "").strip()
    dob = raw.get("bornDate", "").strip()
    bn = cleanup(rawData[i]["bn"], "bn")
    en = cleanup(rawData[i]["en"], "en")
    newData = {
        "id": id,
        "age": age,
        "dob": dob,
        "bn": bn,
        "en": en,
    }
    with open(f"profiles/{id}.json", "w", encoding="utf8") as f:
        json.dump(newData, f, ensure_ascii=False)

    print(f"{i:03}. {id}")


# add the new datas
files = os.listdir("new")
currentLength = len(os.listdir("profiles"))

index = -1
for index, file in enumerate(files):
    with open(f"new/{file}", "rb") as f:
        data = json.load(f)

    id = getNthCombination(currentLength + index)
    age = data["age"]
    dob = data["dob"]
    bn = data["bn"]
    en = data["en"]
    newData = {
        "id": id,
        "age": age,
        "dob": dob,
        "bn": bn,
        "en": en,
    }
    with open(f"profiles/{id}.json", "w", encoding="utf8") as f:
        json.dump(newData, f, ensure_ascii=False)
    
    try:
        os.remove(f"new/{file}")
        print(f"Removed new/{file}")
    except Exception as e:
        print(f"Failed to remove new/{file}: {e}")


print(f"Current Profiles:", currentLength + index + 1)

