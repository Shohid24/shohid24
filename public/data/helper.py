import os
import json
from pprint import pprint as prettyPrint


pprint = lambda *x, **y: prettyPrint(*x, **{**y, "sort_dicts": False})


def writeJsonFile(path: str, data: dict, **kw):
    with open(path, "w", encoding="utf-8") as f:
        return json.dump(data, f, ensure_ascii=False, **kw)


def readJsonFile(path: str) -> dict:
    with open(path, "rb") as f:
        return json.load(f)


def getClearDate(date: str):
    d, m, y = date.split()
    d = d.replace("th", "").replace("st", "").replace("nd", "").replace("rd", "")

    return f"{d} {m} {y}"


def bengaliToEnglishDate(date: str):
    months = {
        "জানুয়ারি": "January",
        "ফেব্রুয়ারি": "February",
        "মার্চ": "March",
        "এপ্রিল": "April",
        "মে": "May",
        "জুন": "June",
        "জুলাই": "July",
        "আগস্ট": "August",
        "সেপ্টেম্বর": "September",
        "অক্টোবর": "October",
        "নভেম্বর": "November",
        "ডিসেম্বর": "December",
    }

    numbers = {
        "০": "0",
        "১": "1",
        "২": "2",
        "৩": "3",
        "৪": "4",
        "৫": "5",
        "৬": "6",
        "৭": "7",
        "৮": "8",
        "৯": "9",
    }

    for b, e in months.items():
        date = date.replace(b, e)

    for b, e in numbers.items():
        date = date.replace(b, e)
    return getClearDate(date)


def getNthCombination(n: int) -> str:
    # by claude llm
    """
    Returns the nth possible 3-letter combination using lowercase letters a-z.

    Args:
        n: Index of the combination (0 to 26^3 - 1)

    Returns:
        str: The nth 3-letter combination

    Raises:
        ValueError: If n is outside the valid range
    """
    # Check if n is within valid range
    max_combinations = 26**3
    if n < 0 or n >= max_combinations:
        raise ValueError(f"Index must be between 0 and {max_combinations - 1}")

    letters = "abcdefghijklmnopqrstuvwxyz"
    result = []

    # Convert to base 26 for 3 letters
    for _ in range(3):
        n, remainder = divmod(n, 26)
        result.append(letters[remainder])

    # Reverse and join the result
    return "".join(reversed(result))
