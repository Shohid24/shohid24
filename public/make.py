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


if __name__ == "__main__":
    main(bn, "bn")
    main(en, "en")