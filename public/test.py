from bs4 import BeautifulSoup
import json, requests, os


ses = requests.Session()
if not os.path.exists("photos"):
    os.makedirs("photos")


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

    for id in range(0, len(them)):
        profile: BeautifulSoup = them[id]
        name = profile.h3.text.strip()
        textInfo = profile.findAll("span")
        profession = sanitizeText(textInfo[0].text)
        info = sanitizeText(textInfo[1].text)
        date = profile.find(
            "p", class_="text-sm text-gray-600 md:text-base"
        ).text.strip()
        image = images[id]
        src = image["src"]
        engName = src.split("/")[-1].split(".")[0].replace("-", " ").title()
        fileName = f"{id}.jpg"
        url = f"https://shohid.online/shohid/{src.split('/')[-1]}"
        if url.endswith("unknown-dead-body.jpg"):
            url = None

        if url and not os.path.exists(f"photos/{fileName}"):
            with open(f"photos/{fileName}", "wb") as f:
                f.write(ses.get(url).content)
                print(f"{id:03}. {fileName}")

        data = {
            "id": id,
            "name": name,
            "profession": profession,
            "info": info,
            "date": date,
            "engName": engName,
            "url": url,
        }

        allData.append(data)

    print("Finished")

    with open(f"data_{lang}.json", "w", encoding="utf-8") as f:
        json.dump(allData, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    generateJsonFile(doc, "bn")
    generateJsonFile(enDoc, "en")
