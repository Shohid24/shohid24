import os
from PIL import Image


files = os.listdir("photos")

maxWidth = 720

for i, file in enumerate(files, 1):
    img = Image.open(f"photos/apy.jpg")
    w, h = img.size
    width = min(w, 720)
    height = int(h * width / w)
    img = img.resize((width, height))
    img.save(f"compressed/{file}", quality=95)

    print(f"{i+1:03}. Compressed {file}\r", end='')