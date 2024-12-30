from bs4 import BeautifulSoup
import json, requests, os
from getID import getNthCombination


ses = requests.Session()
if not os.path.exists("./../photos"):
    os.makedirs("./../photos")


def sanitizeText(text):
    text = " ".join(text.split())
    text = text.replace("\n", ", ")
    return text.strip()


with open("data.html", "r", encoding="utf-8") as f, open(
    "enData.html", "r", encoding="utf-8"
) as g:
    doc = BeautifulSoup(f.read(), "lxml")
    enDoc = BeautifulSoup(g.read(), "lxml")


def generateJsonFile(content, lang="bn"):
    them = content.findAll("div", class_="lg:p-2")
    images = content.findAll("img", alt="martyr")

    allData = []

    for index in range(0, len(them)):
        profile: BeautifulSoup = them[index]

        id = getNthCombination(index)
        name = profile.h3.text.strip()
        textInfo = profile.findAll("span")
        profession = sanitizeText(textInfo[0].text)
        info = sanitizeText(textInfo[1].text)
        date = profile.find(
            "p", class_="text-sm text-gray-600 md:text-base"
        ).text.strip()

        # image
        image = images[index]
        src = image["src"]
        fileName = f"{id}.jpg"
        slug = src.split("/")[-1]
        url = f"https://shohid.online/shohid/{slug}"

        if slug == "unknown-dead-body.jpg":
            url = None

        folder = "./../photos"

        if url and not os.path.exists(f"{folder}/{fileName}"):
            r = ses.get(url)
            if r.status_code != 200:
                print(f"Failed to download {url}")
            else:
                with open(f"{folder}/{fileName}", "wb") as f:
                    f.write(r.content)
                    print(f"{index}. {fileName}")

        data = {
            "id": id,
            "name": name,
            "profession": profession,
            "info": info,
            "date": date,
            "originalURL": url,
        }

        allData.append(data)

    print("Finished")

    with open(f"data_{lang}.json", "w", encoding="utf-8") as f:
        json.dump(allData, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    raise Exception("Do not run this script now")
    generateJsonFile(doc, "bn")
    generateJsonFile(enDoc, "en")


"""
NOTE: 

There are several duplicates.

Remove `and`, `aow`

"""
