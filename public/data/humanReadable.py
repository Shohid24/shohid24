import os
import json

from helper import writeJsonFile, readJsonFile, pprint


folder = "shared"

searchable = readJsonFile("searchableData.json")
a = readJsonFile("profiles/aaa.json")


X = {
    "name": "",
    "birthPlace": "",
    "profession": "",
    "info": "",
    "bio": "",
    "cause": "",
}
dictOrder = {"id": "", "date": "", "age": "", "dob": "", "bn": X, "en": X}


mainData = []

for index, person in enumerate(searchable, 1):
    id = person["id"]
    info = person["info"]
    date = person["date"]
    hasImage = person["hasImage"]

    data = readJsonFile(f"profiles/{id}.json")
    data["date"] = date
    data["bn"]["info"] = info["bn"]
    data["en"]["info"] = info["en"]

    newData = {}

    for key in dictOrder:
        if isinstance(dictOrder[key], dict):
            newData[key] = {
                k: data.get(key).get(k, v) for k, v in dictOrder[key].items()
            }
        else:
            newData[key] = data.get(key)

    mainData.append(newData)
    print(f"{index:03}. {id}", end="\r")

print()

if __name__ == "__main__":
    writeJsonFile("shared/allData.json", mainData, indent=2)
    print("allData.json created successfully.")
