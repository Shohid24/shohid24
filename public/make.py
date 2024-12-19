import json, os

with open("data_bn.json", "rb") as f, open("data_en.json", "rb") as g:
    bn = json.load(f)
    en = json.load(g)


def main(data, lang):
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

    with open(f"shortData_{lang}.json", "w", encoding="utf-8") as f:
        json.dump(shortData, f, ensure_ascii=False, indent=None)

    return shortData


def dumpSearchableJson(data1, data2):
    finalData = []
    for i in range(len(data1)):
        nameBn = data1[i][1]
        nameEn = data2[i][1]
        professionBn = data1[i][2]
        professionEn = data2[i][2]
        infoBn = data1[i][3]
        infoEn = data2[i][3]
        date = data1[i][4]
        id = data1[i][0]
        hasImage = data1[i][-1]
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
    a = main(bn, "bn")
    b = main(en, "en")
    dumpSearchableJson(a, b)
