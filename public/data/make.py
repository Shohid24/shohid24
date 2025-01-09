import os
import json
from helper import writeJsonFile, readJsonFile

with open("data_bn.json", "rb") as f, open("data_en.json", "rb") as g:
    bn = json.load(f)
    en = json.load(g)

folder = "./../photos"

newEn = en.copy()
newBn = bn.copy()


def makeShortData(data, lang):
    shortData = []
    for person in data:
        id = person["id"]
        name = person["name"]
        profession = person["profession"]
        info = person["info"]
        date = person["date"]

        exists = False
        if os.path.exists(f"{folder}/{id}.jpg"):
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

    writeJsonFile(f"shortData_{lang}.json", shortData)

    return shortData


def dumpSearchableJson():
    enData = readJsonFile("shortData_en.json")
    bnData = readJsonFile("shortData_bn.json")
    finalData = []
    for i in range(len(enData)):
        nameBn = bnData[i][1]
        nameEn = enData[i][1]
        professionBn = bnData[i][2]
        professionEn = enData[i][2]
        infoBn = bnData[i][3]
        infoEn = enData[i][3]
        date = enData[i][4]
        id = enData[i][0]
        hasImage = enData[i][-1]
        data = {
            "id": id,
            "name": {"bn": nameBn, "en": nameEn},
            "profession": {"bn": professionBn, "en": professionEn},
            "info": {"bn": infoBn, "en": infoEn},
            "date": date,
            "hasImage": hasImage,
        }
        finalData.append(data)

    with open("searchableData.json", "w", encoding="utf-8") as f:
        json.dump(finalData, f, ensure_ascii=False, indent=None)

    os.remove("shortData_bn.json")
    os.remove("shortData_en.json")
    return finalData


if __name__ == "__main__":
    makeShortData(newBn, "bn")
    makeShortData(newEn, "en")
    dumpSearchableJson()
