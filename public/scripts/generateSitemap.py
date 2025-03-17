import os
import datetime
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

if os.path.exists("public/photos"):
    os.chdir("public")

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["prod"]
collection = db["individual"]
data = list(collection.find())


profiles = [f"profile/{i['id']}" for i in data]

otherPages = "about contact profile".split()

baseUrl = "https://shohid24.pages.dev/"

lastmod = datetime.datetime.now().strftime("%Y-%m-%d")


def getEntry(
    loc: str, priority: float, changefreq: str = "weekly", lastmod: str = lastmod
) -> str:
    """
    Generates a single sitemap entry.
    """
    return (
        f"  <url>\n"
        f"    <loc>{loc}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        f"    <changefreq>{changefreq}</changefreq>\n"
        f"    <priority>{priority}</priority>\n"
        f"  </url>\n"
    )


# Create the sitemap XML content
sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

sitemap += getEntry(baseUrl, 1.0)

for page in otherPages:
    sitemap += getEntry(f"{baseUrl}{page}", 0.9)

for profile in profiles:
    sitemap += getEntry(f"{baseUrl}{profile}", 0.5)


sitemap += "</urlset>"

output_path = "sitemap.xml"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(sitemap)

print(f"Sitemap has been written to {output_path}")
