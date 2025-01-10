from helper import readJsonFile

searchable = readJsonFile("searchableData.json")

def findCount(name:str, date:str):
    count = 0
    for i in searchable:
        if i["name"]["en"].lower() == name.lower() and i["date"] == date:
            count += 1
    
    return count

# check duplicates for all names

for i in searchable:
    name = i["name"]["en"].lower()
    date = i["date"]
    count = findCount(name, date)
    if count > 1:
        print(f"Duplicate found for name '{name}': {count} occurrences")
    
