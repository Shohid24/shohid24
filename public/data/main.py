import os, json
from helper import readJsonFile

data = readJsonFile("searchableData.json")
rawData = readJsonFile("rawData.json")


def sanitizeText(text, lang="en") -> str:
    text = " ".join(text.split())
    text = text.replace("\n", ", ").strip()

    if text and not text.endswith((".", "।")):
        text += "." if lang == "en" else "।"

    return (text[0] + text[1:]) if text else text


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
        "cause": (
            sanitizeText(shortCause, lang) + "\n" + sanitizeText(longCause, lang)
        ).strip(),
    }


os.makedirs("profiles", exist_ok=True)

for i in range(len(rawData)):
    id = data[i]["id"]
    raw: dict = rawData[i]
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
