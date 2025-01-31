import os
from PIL import Image

if os.path.exists("public/photos"):
    os.chdir("public")


files = os.listdir("photos")
maxWidth = 720

os.makedirs("compressed", exist_ok=True)

for i, file in enumerate(files, 1):
    img = Image.open(f"photos/{file}")
    w, h = img.size
    width = min(w, 512)
    height = int(h * width / w)
    img = img.resize((width, height))
    img.save(f"compressed/{file}", quality=90, optimize=True)

    print(f"{i+1:03}. Compressed {file}\r", end="")
