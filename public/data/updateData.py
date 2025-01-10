import os

files = "makeSearchable.py dumpProfiles.py".split()
for i in files:
    print(f"Running `python {i}`")
    os.system(f"python {i}")


print("Update Done")