from duckduckgo_search import DDGS
from time import sleep


class Counter:
    count = 0


def askAI(prompt: str) -> str:
    duck = DDGS(timeout=30)

    if Counter.count > 1 and Counter.count % 15 == 0:
        for i in range(30, -1, -1):
            print(f"Sleeping for {i} seconds\r", end='')
            sleep(1)
        print()
    try:
        chat = duck.chat(prompt, model="gpt-4o-mini", timeout=30)
        Counter.count += 1
    except Exception as e:
        print(f"!!! - Error while asking AI: {e}")
        print("Exiting...")
        exit(0)

    print(f"AI Count: {Counter.count:03}")
    return chat.strip()


def getEnglish(text: str) -> str:
    prompt = f"""
Give me the english translation of this text from bengali to english. Just respond with the translation and nothing else.
Here's the text to translate:

{text}
""".strip()
    return askAI(prompt)


def getProperBengali(text: str) -> str:
    prompt = f"""
This text should be a bengali text. If this is not a bengali text, make it bengali and fix the wrong things. The text should say the reason of death. If the text says, "gun shot death". This means you will give me: "গুলিবিদ্ধ হয়ে মারা গিয়েছেন". If it says any other text, translate it and respond with the proper answer. Make a complete sentence from the text. Even if the text is a phrase, make it a sentence.
You will just give me the corrected text and nothing else. 
Here's the text:

{text}
""".strip()
    return askAI(prompt)


def getProperEnglish(text: str) -> str:
    prompt = f"""
This text should be a english text. If this is not an english text, make it english and fix the wrong things. The text should say the reason of death. If the text says, "gun shot death". This means you will give me: "Died because of gun shot.". If it says any other text, translate it and respond with the proper answer. Make a complete sentence from the text. Even if the text is a phrase, make it a sentence.
You will just give me the corrected text and nothing else. 
Here's the text:

{text}
""".strip()
    return askAI(prompt)


def getProperAddress(address:str):
    prompt = f"""
You will be given some address like these. You have to return only the results in the format I later say. I want to have the address separated by command and atmost 3 fields.
The main ones will be kept. Remove any road number or union number. Give me just plain result.

Addresses you will likely receive:
বাসা: উত্তরপাড়া গ্রাম: দুমরাই ইউনিয়ন: রুদ্রপুর- ৬৭২০ উপজেলা: রায়গঞ্জ জেলা: সিরাজগঞ্জ
আমিন নগর, সাঁকোয়া-৫০১০, বোদা, পঞ্চগড়
আকুবদন্ডী, হাঁওলা শরীফ, বোয়াল খালী, চট্টগ্রাম
গ্রাম: কিশোরগাড়ি, ডাকঘর: কাশিয়াবাড়ী-৫৭৩০ উপজেলা: পলাশবাড়ী জেলা: গাইবান্ধা

The type of result I want:
দুমরাই, রায়গঞ্জ, সিরাজগঞ্জ
আমিন নগর, বোদা, পঞ্চগড়
আকুবদন্ডী, বোয়াল খালী, চট্টগ্রাম
কিশোরগাড়ি, পলাশবাড়ী, গাইবান্ধা


Only give the result address and nothing else.

My given address is:
{address}
""".strip()
    return askAI(prompt)

# print(getEnglish("মোহাম্মদ জামাল"))
# print(getProperBengali("Cardio respiratory failure"))
