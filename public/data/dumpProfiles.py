# Script No: 2 to make `/profiles/{id}.json`

import os, json
from helper import readJsonFile
from datetime import datetime
from pprint import pprint

data = readJsonFile("searchableData.json")
rawData = readJsonFile("rawData.json")


def findCount(name:str, date:str):
    count = 0
    for i in data:
        if i["name"]["en"].lower().strip() == name.lower().strip() and i["date"] == date:
            count += 1
    
    return count

def sanitizeText(text, lang="en", addDot = True) -> str:
    text = " ".join(text.split())
    text = text.replace("\n", ", ").strip()

    if addDot and text and not text.endswith((".", "।")):
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
        "name": sanitizeText(name, lang, addDot=False),
        "birthPlace": sanitizeText(birthPlace, lang),
        "profession": sanitizeText(profession, lang),
        "bio": sanitizeText(bio, lang),
        "cause": (
            sanitizeText(shortCause, lang) + "\n" + sanitizeText(longCause, lang)
        ).strip(),
    }

def formatDate(input_date: str) -> str:
    # from chatgpt
    if not input_date:
        return ""
    def ordinal(n):
        return f"{n}{'th' if 11 <= n % 100 <= 13 else {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th')}"

    date_formats = ["%b. %d, %Y", "%B %d, %Y", "%b. %d, %Y", "%d %B %Y", "%d/%m/%Y"]
    for fmt in date_formats:
        try:
            parsed_date = datetime.strptime(input_date, fmt)
            day = ordinal(parsed_date.day)
            return f"{day} {parsed_date.strftime('%B')}, {parsed_date.year}"
        except ValueError:
            continue
    raise ValueError(f"Date format not recognized: {input_date}")




os.makedirs("profiles", exist_ok=True)

def findIndex(name, date):
    for index, i in enumerate(data):
        if i["name"]["en"].lower().strip() == name.lower().strip() and i["date"] == date:
            return index
    
    return -1

for i in range(len(rawData)):
    raw: dict = rawData[i]
    age = raw.get("age", "").strip()
    martyrDate = formatDate(raw["diedDate"])
    dobBN = raw["bn"].get("bornDate", "").strip()
    dobEN = formatDate(raw["en"].get("bornDate", "").strip())
    bn = cleanup(rawData[i]["bn"], "bn")
    en = cleanup(rawData[i]["en"], "en")
    
    dataIndex = findIndex(en["name"].strip(), martyrDate)
    if dataIndex == -1:
        print(f"Failed to find id for {en['name']}, {martyrDate}")
        continue

    id = data[dataIndex]["id"]
    newData = {
        "id": id,
        "age": age,
        "dob": dobEN,
        "bn": bn,
        "en": en,
    }
    with open(f"profiles/{id}.json", "w", encoding="utf8") as f:
        json.dump(newData, f, ensure_ascii=False)

    # print(f"{i:03}. {id}")
        
