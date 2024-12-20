import json, os, datetime

with open("data_bn.json", "rb") as f, open("data_en.json", "rb") as g:
    bn = json.load(f)
    en = json.load(g)

folder = "./../photos"


# sort `en` by the date property. date is like: 16th July, 2024
def getClearDate(date: str):
    d, m, y = date.split()
    d = d[:-2]

    return f"{d} {m} {y}"


def writeJsonFile(path: str, data: dict, **kw):
    with open(path, "w", encoding="utf-8") as f:
        return json.dump(data, f, ensure_ascii=False, **kw)


def readJsonFile(path: str):
    with open(path, "rb") as f:
        return json.load(f)


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


def renamePhotos():
    newEn = sorted(
        en,
        key=lambda x: datetime.datetime.strptime(getClearDate(x["date"]), "%d %B, %Y"),
    )
    newBn = [bn[i["id"]] for i in newEn]

    tempFolder = f"{folder}/temp"
    os.makedirs(tempFolder, exist_ok=True)

    for newID in range(len(newEn)):
        newBn[newID]["id"] = newID
        oldID = newEn[newID]["id"]
        oldFilePath = f"{folder}/{oldID}.jpg"
        tempFilePath = f"{tempFolder}/{oldID}.jpg"

        if os.path.exists(oldFilePath):
            os.rename(oldFilePath, tempFilePath)

    for newID in range(len(newEn)):
        newFilePath = f"{folder}/{newID}.jpg"
        tempFilePath = f"{tempFolder}/{newID}.jpg"

        if os.path.exists(tempFilePath):
            os.rename(tempFilePath, newFilePath)

        newEn[newID]["id"] = newID
        newBn[newID]["id"] = newID

    os.rmdir(tempFolder)

    writeJsonFile("data_bn.json", newBn, indent=3)
    writeJsonFile("data_en.json", newEn, indent=3)


def dumpSearchableJson():
    renamePhotos()
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

    return finalData


if __name__ == "__main__":
    makeShortData(bn, "bn")
    makeShortData(en, "en")
    dumpSearchableJson()
