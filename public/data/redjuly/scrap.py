import os
import json
import httpx
from bs4 import BeautifulSoup
from dataclasses import dataclass

url = "https://redjuly.live/"

ses = httpx.Client(base_url=url, timeout=10, follow_redirects=True)
if os.path.exists("redjuly"):
    os.chdir("redjuly")
    print(f"-> cd redjuly")
    print()


@dataclass
class Paths:
    shohid: str = "/shohid/shohid_list_page/"
    injured: str = "/injured/injured_list_page/"
    primaryShohid = "/primary_list/shohid/?page={}"
    primaryInjured = "/primary_list/injured/?page={}"


def writeJsonFile(path: str, data: dict, **kw):
    with open(path, "w", encoding="utf-8") as f:
        return json.dump(data, f, ensure_ascii=False, **kw)


def getTable(r: httpx.Response):
    doc = BeautifulSoup(r.content, "lxml")
    soup = doc.find("tbody", class_="whitespace-nowrap")
    if not soup:
        print(doc.prettify())
        print()
        print(r.url)
    return soup.findAll("tr")


notFound = "জানা যায় নি", "None", ""


def scrapMartyrs():
    r = ses.get(Paths.shohid)
    mainData = []
    martyrs = getTable(r)
    for row in martyrs:
        tds = row.findAll("td")
        keys = (
            "id",
            "name",
            "father",
            "mother",
            "age",
            "profession",
            "deathCause",
            "deathPlace",
            "murderer",
            "martyrDate",
        )
        data = {
            keys[i]: (
                tds[i].text.strip() if tds[i].text.strip() not in notFound else None
            )
            for i in range(len(keys))
        }
        img = row.find("img")
        img = img["src"] if img else None
        data["image"] = img

        mainData.append(data)

    writeJsonFile("martyrs.json", mainData, indent=2)


def scrapInjured():
    r = ses.get(Paths.injured)
    mainData = []
    martyrs = getTable(r)
    for row in martyrs:
        tds = row.findAll("td")
        keys = (
            "id",
            "name",
            "father",
            "mother",
            "age",
            "profession",
            "attacker",
            "weapon",
            "attackPlace",
            "attackDate",
        )
        data = {
            keys[i]: (
                tds[i].text.strip() if tds[i].text.strip() not in notFound else None
            )
            for i in range(len(keys))
        }
        img = row.find("img")
        img = img["src"] if img else None
        data["image"] = img

        mainData.append(data)

    writeJsonFile("injured.json", mainData, indent=2)


def _primaryScrap(name: str):
    mainData = []
    totalPages = 16 if name == "martyrs" else 27
    for page in range(1, totalPages):
        url = (
            name == "martyrs"
            and Paths.primaryShohid.format(page)
            or Paths.primaryInjured.format(page)
        )
        r = ses.get(url)
        martyrs = getTable(r)
        for row in martyrs:
            tds = row.findAll("td")
            keys = ("name", "date", "deathPlace", "district", "profession")
            data = {
                keys[i]: (
                    tds[i].text.strip() if tds[i].text.strip() not in notFound else None
                )
                for i in range(len(keys))
            }
            mainData.append(data)

    writeJsonFile(f"primary_{name}.json", mainData, indent=2)


def scrapPrimary():
    names = "martyrs", "injured"
    for name in names:
        _primaryScrap(name)
        print(f"{name.title()} primary data scraped successfully.")


if __name__ == "__main__":
    scrapMartyrs()
    scrapInjured()
    scrapPrimary()
    print("Scraping completed successfully.")
