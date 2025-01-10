import os, json
import httpx
from bs4 import BeautifulSoup
from datetime import datetime, timezone

from translation import getEnglish, getProperBengali, getProperEnglish, getProperAddress

ses = httpx.Client(timeout=10, follow_redirects=True)

shohidIDs = """
SH734
SH474
SH740
SH733
SH734
SH6
SH3
SH651








""".split()


def writeJsonFile(path: str, data: dict, **kw):
    with open(path, "w", encoding="utf-8") as f:
        return json.dump(data, f, ensure_ascii=False, **kw)


def formatDate(input_date: str) -> str:
    # from chatgpt
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


def getData(id: str):
    r = ses.get(f"https://redjuly.live/shohid/shohid_profile/{id}/")
    doc = BeautifulSoup(r.content, "lxml")

    def getText(label: str) -> str:
        return doc.find(string=label).parent.next_sibling.strip()

    name = doc.find(
        "h2", class_="text-primary text-xl lg:text-3xl font-extrabold"
    ).text.strip()
    profession = getText("পেশা:")

    dateOfBirth = formatDate(getText("জন্ম গ্রহণ করেন:"))
    dateOfInjury = formatDate(getText("আহত হন:"))
    place = getText("ঘটনা সংঘটনের স্থান:")
    injuryReason = getText("আহত হওয়ার ধরন:")
    martyrDate = formatDate(getText("শাহাদাত বরণ করেন:"))
    age = getText("শাহাদাতের সময় বয়স ছিল:").split()[0]
    bio = getText("সংক্ষিপ্ত জীবনী:")
    birthPlace = getProperAddress(getText("স্থায়ী ঠিকানা:"))
    img = doc.find(
        "img", class_="w-[280px] rounded-lg shadow-[-20px_20px_0px_rgba(128,0,0,1)]"
    )
    img = "https://redjuly.live/" + img["src"] if img else None

    engName = getEnglish(name)

    data = {
        "age": age,
        "dob": dateOfBirth,
        "date": martyrDate,
        "image": img,
        "bn": {
            "name": name,
            "info": place,
            "birthPlace": birthPlace,
            "profession": profession,
            "bio": bio,
            "cause": getProperBengali(injuryReason),
        },
        "en": {
            "name": engName,
            "info": getEnglish(place),
            "birthPlace": getEnglish(birthPlace),
            "profession": getEnglish(profession),
            "bio": getEnglish(bio),
            "cause": getProperEnglish(getEnglish(injuryReason)),
        },
    }

    print(f"Done for {engName}")
    writeJsonFile(f"shohid_{id}.json", data, indent=2)
    return data


if __name__ == "__main__":
    for id in shohidIDs:
        getData(id)