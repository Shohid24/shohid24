# Script No: 2 to make `/profiles/{id}.json`

import os, string, json
from helper import readJsonFile
from datetime import datetime
from pprint import pprint

data = readJsonFile("searchableData.json")
rawData = readJsonFile("rawData.json")


bengaliProfs = {
    "EMPLOYEE": "কর্মচারী",
    "BANKER": "ব্যাংকার",
    "GARMENT_WORKER": "গার্মেন্ট কর্মী",
    "RICKSHAW_PULLER": "রিকশা চালক",
    "HAWKER": "হকার",
    "GRAPHICS_DESIGNER": "গ্রাফিক্স ডিজাইনার",
    "MERCHANDISING_ASSISTANT": "মার্চেন্ডাইজিং সহকারী",
    "TAILOR": "দর্জি",
    "CHEF": "রাঁধুনি",
    "SALESMAN": "বিক্রয়কর্মী",
    "JOURNALIST": "সাংবাদিক",
    "AC_MECHANIC": "এসি মেকানিক",
    "STUDENT_EMPLOYEE": "ছাত্র কর্মচারী",
    "FISH_SELLER": "মাছ বিক্রেতা",
    "COSMETICS_BUSINESS": "প্রসাধনী ব্যবসা",
    "RENT_A_CAR_OWNER": "ভাড়া গাড়ির মালিক",
    "VAN_DRIVER": "ভ্যান চালক",
    "DOCTOR": "ডাক্তার",
    "AUTO_DRIVER": "অটো চালক",
    "TEACHER": "শিক্ষক",
    "SOCIAL_WORKER": "সামাজিক কর্মী",
    "CAR_MECHANIC": "গাড়ির মেকানিক",
    "IMAM": "ইমাম",
    "CONTRACTOR": "ঠিকাদার",
    "LAWYER": "আইনজীবী",
    "LAB_TECHNOLOGIST": "ল্যাব প্রযুক্তিবিদ",
    "ELECTRICIAN": "ইলেকট্রিশিয়ান",
    "BUS_DRIVER": "বাস চালক",
    "GROCERY_STORE_OWNER": "মুদির দোকানের মালিক",
    "SHOP_WORKER": "দোকানের কর্মচারী",
    "PHOTOJOURNALIST": "ছবিসাংবাদিক",
    "HOUSEWIFE": "গৃহিণী",
    "GARMENT_MERCHANDISER": "গার্মেন্ট মার্চেন্ডাইজার",
    "SHOE_SHOP_OWNER": "জুতার দোকানের মালিক",
    "TILES_MISTRY": "টাইলস মিস্ত্রি",
    "DELIVERY_MAN": "ডেলিভারি ম্যান",
    "TILES_REPAIRER": "টাইলস মেরামতকারী",
    "TECHNICIAN": "প্রযুক্তিবিদ",
    "CARPENTER": "কাঠমিস্ত্রি",
    "CONSTRUCTION_WORKER": "নির্মাণ শ্রমিক",
    "EXPATRIATE": "প্রবাসী",
    "DAY_LABORER": "দৈনিক মজুর",
    "FARMER": "কৃষক",
    "STUDENT": "শিক্ষার্থী",
    "DRIVER": "চালক",
    "FACTORY_EMPLOYEE": "কারখানার কর্মচারী",
    "GARMENTS_EXPORT_BUSINESS": "গার্মেন্ট রপ্তানি ব্যবসা",
    "SALOON_EMPLOYEE": "সেলুন কর্মচারী",
    "LINE_WORKER": "লাইন কর্মী",
    "MADRASA_STUDENT": "মাদ্রাসার শিক্ষার্থী",
    "INSURANCE_OFFICER": "বীমা কর্মকর্তা",
    "SHOPKEEPER": "দোকানদার",
    "WORKER": "শ্রমিক",
    "BUSINESSMAN": "ব্যবসায়ী",
    "ASSISTANT_ACCOUNTS_MANAGER": "সহকারী হিসাব ব্যবস্থাপক",
    "MASON": "রাজমিস্ত্রি",
    "REBAR_WORKER": "রড শ্রমিক",
    "INTERN": "ইন্টার্ন",
    "PLUMBER": "পাইপ ফিটার",
    "CNG_DRIVER": "সিএনজি চালক",
    "VEGETABLE_SELLER": "সবজি বিক্রেতা",
    "CHILD": "শিশু",
    "WORKSHOP_WORKER": "ওয়ার্কশপ কর্মী",
    "ASSISTANT": "সহকারী",
}


def findCount(name: str, date: str):
    count = 0
    for i in data:
        if (
            i["name"]["en"].lower().strip() == name.lower().strip()
            and i["date"] == date
        ):
            count += 1

    return count


def sanitizeText(text, lang="en", addDot=True) -> str:
    text = " ".join(text.split())
    text = text.replace("\n", ", ").strip()

    if addDot and text and not text.endswith((".", "।")):
        text += "." if lang == "en" else "।"

    return (text[0] + text[1:]) if text else text


def cleanup(data, lang="en"):
    name = data["name"]
    birthPlace = data["bornAddress"]
    bio = data["biography"]
    cause = data["howToDeath"]
    shortCause = cause["short"]
    longCause = cause["long"]
    return {
        "name": sanitizeText(name, lang, addDot=False),
        "birthPlace": sanitizeText(birthPlace, lang),
        "profession": "",
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
        if (
            i["name"]["en"].lower().strip() == name.lower().strip()
            and i["date"] == date
        ):
            return index

    return -1


for i in range(len(rawData)):
    raw: dict = rawData[i]
    age = raw.get("age", "").strip()
    prof = raw.get("profession", "").strip()
    martyrDate = formatDate(raw["diedDate"])
    dobBN = raw["bn"].get("bornDate", "").strip()
    dobEN = formatDate(raw["en"].get("bornDate", "").strip())
    bn = cleanup(rawData[i]["bn"], "bn")
    en = cleanup(rawData[i]["en"], "en")

    if prof:
        en["profession"] = " ".join(prof.title().split("_"))
        bn["profession"] = bengaliProfs[prof]

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

    print(f"{i:03}. {id}")
