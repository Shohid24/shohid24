# Script No: 1, make `searchableData.json`


import json, os
from copy import deepcopy
from datetime import datetime
from helper import writeJsonFile, readJsonFile

with open("data_bn.json", "rb") as f, open("data_en.json", "rb") as g:
    bn = json.load(f)
    en = json.load(g)

folder = "./../photos"


newEn = deepcopy(en)
newBn = deepcopy(bn)


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


def fixDate(date_str: str) -> str:
    date_parts = date_str.split()
    day = "".join(filter(str.isdigit, date_parts[0]))
    month = date_parts[1].strip(",")
    year = date_parts[2]
    try:
        month_number = datetime.strptime(month, "%B").month
    except ValueError:
        raise ValueError(f"Invalid month name: {month}")
    fixed_date = f"{int(day):02}/{month_number:02}/{year}"
    return fixed_date


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

def getClearDate(date: str):
    d, m, y = date.split()
    d = d.replace("th", "").replace("st", "").replace("nd", "").replace("rd", "")

    return f"{d} {m} {y}"


def dumpSearchableJson():
    enData = readJsonFile("shortData_en.json")
    bnData = readJsonFile("shortData_bn.json")
    newData = []

    # Create new data with updated information
    for i in range(len(enData)):
        nameBn = bnData[i][1]
        nameEn = enData[i][1]
        professionBn = bnData[i][2]
        professionEn = enData[i][2]
        infoBn = bnData[i][3]
        infoEn = enData[i][3]
        date = formatDate(fixDate(enData[i][4]))
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
        newData.append(data)

    filename = "searchableData.json"
    oldData = readJsonFile(filename)

    def findIndex(id: str) -> int:
        for i, d in enumerate(oldData):
            if d["id"] == id:
                return i
        return -1

    for new in newData:
        index = findIndex(new["id"])
        if index != -1:
            oldData[index] = new
        else:
            oldData.append(new)

    data = sorted(
        oldData,
        key=lambda x: datetime.strptime(getClearDate(x["date"]), "%d %B, %Y"),
    )

    writeJsonFile(filename, data)

    os.remove("shortData_bn.json")
    os.remove("shortData_en.json")

    return oldData


if __name__ == "__main__":
    # raise Exception("Do not run this script.")
    makeShortData(newBn, "bn")
    makeShortData(newEn, "en")
    dumpSearchableJson()
    print("Made Searchable Json")
