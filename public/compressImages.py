import os
from PIL import Image

if os.path.exists("public/photos"):
    os.chdir("public")

files = os.listdir("photos")
maxWidth = 256

os.makedirs("compressed", exist_ok=True)

for i, file in enumerate(files, 1):
    file_path = f"photos/{file}"

    try:
        with Image.open(file_path) as img:
            w, h = img.size

            if w > maxWidth:
                width = maxWidth
                height = int(h * width / w)
                img = img.resize((width, height))

            img.save(f"compressed/{file}", quality=70, optimize=True)
            print(f"{i:03}. Compressed {file}\r", end="")

    except Exception as e:
        print(f"Skipping {file}: {e}")
