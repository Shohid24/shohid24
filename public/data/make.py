import json, os, datetime

with open("data_bn.json", "rb") as f, open("data_en.json", "rb") as g:
    bn = json.load(f)
    en = json.load(g)

folder = "./../photos"


# sort `en` by the date property. date is like: 16th July, 2024
def getClearDate(date: str):
    d, m, y = date.split()
    d = d.replace("th", "").replace("st", "").replace("nd", "").replace("rd", "")

    return f"{d} {m} {y}"

def bengaliToEnglishDate(date: str):
    months = {
        "জানুয়ারি": "January",
        "ফেব্রুয়ারি": "February",
        "মার্চ": "March",
        "এপ্রিল": "April",
        "মে": "May",
        "জুন": "June",
        "জুলাই": "July",
        "আগস্ট": "August",
        "সেপ্টেম্বর": "September",
        "অক্টোবর": "October",
        "নভেম্বর": "November",
        "ডিসেম্বর": "December",
    }

    numbers = {
        "০": "0",
        "১": "1",
        "২": "2",
        "৩": "3",
        "৪": "4",
        "৫": "5",
        "৬": "6",
        "৭": "7",
        "৮": "8",
        "৯": "9",
    }

    for b, e in months.items():
        date = date.replace(b, e)

    for b, e in numbers.items():
        date = date.replace(b, e)
    return getClearDate(date)


newEn = sorted(
    en,
    key=lambda x: datetime.datetime.strptime(getClearDate(x["date"]), "%d %B, %Y"),
)
newBn = sorted(
    bn,
    key=lambda x: datetime.datetime.strptime(bengaliToEnglishDate(x["date"]), "%d %B, %Y"),
)

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

    return finalData


if __name__ == "__main__":
    makeShortData(newBn, "bn")
    makeShortData(newEn, "en")
    dumpSearchableJson()
