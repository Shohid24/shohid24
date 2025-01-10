from helper import readJsonFile, writeJsonFile

searchable = readJsonFile("searchableData.json")

ids = "aqa aqb aqc aqd aqe aqf aqg aqh aqi".split()

for id in ids:
    for index, person in enumerate(searchable):
        if person["id"] == id:
            print(f"ID: {person['id']}")
            searchable[index]["hasImage"] = 1


# writeJsonFile("searchableData.json", searchable)