// Define types for clarity
type NumericMapping = { [key: string]: string };
type MonthNameMappings = {
  en: { [key: string]: string };
  bn: { [key: string]: string };
};

// Numeric mappings
const bengaliToEnglishNumerals: NumericMapping = {
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
};

const englishToBengaliNumerals: NumericMapping = Object.fromEntries(
  Object.entries(bengaliToEnglishNumerals).map(([k, v]) => [v, k]),
);

// Mapping of month names
const monthNamesMappings: MonthNameMappings = {
  en: {
    জানুয়ারি: "January",
    ফেব্রুয়ারি: "February",
    মার্চ: "March",
    এপ্রিল: "April",
    মে: "May",
    জুন: "June",
    জুলাই: "July",
    আগস্ট: "August",
    সেপ্টেম্বর: "September",
    অক্টোবর: "October",
    নভেম্বর: "November",
    ডিসেম্বর: "December",
  },
  bn: {
    January: "জানুয়ারি",
    February: "ফেব্রুয়ারি",
    March: "মার্চ",
    April: "এপ্রিল",
    May: "মে",
    June: "জুন",
    July: "জুলাই",
    August: "আগস্ট",
    September: "সেপ্টেম্বর",
    October: "অক্টোবর",
    November: "নভেম্বর",
    December: "ডিসেম্বর",
  },
};

// Replace ordinal suffixes (st, nd, rd, th)
const replaceOrdinalSuffix = (dateString: string): string => {
  return dateString.replace(/\b(\d+)(st|nd|rd|th)\b/g, "$1");
};

/**
 * Converts a Bengali date to an English date
 * @param bengaliDate - Date string in Bengali
 * @returns Date string in English
 */
const toEnglish = (bengaliDate: string): string => {
  // Replace Bengali numerals with English numerals
  const englishNumerals = bengaliDate
    .split("")
    .map((char) => bengaliToEnglishNumerals[char] || char)
    .join("");

  // Replace Bengali month names with English month names
  let englishDate = englishNumerals;
  Object.keys(monthNamesMappings.en).forEach((bnMonth) => {
    englishDate = englishDate.replace(
      new RegExp(bnMonth, "g"),
      monthNamesMappings.en[bnMonth],
    );
  });

  // Replace ordinal suffixes
  englishDate = replaceOrdinalSuffix(englishDate);

  return englishDate.trim();
};

/**
 * Converts an English date to a Bengali date
 * @param englishDate - Date string in English
 * @returns Date string in Bengali
 */
const toBengali = (englishDate: string | number): string => {
  // Replace English numerals with Bengali numerals
  const bengaliNumerals = String(englishDate)
    .split("")
    .map((char) => englishToBengaliNumerals[char] || char)
    .join("");

  // Replace English month names with Bengali month names
  let bengaliDate = bengaliNumerals;
  Object.keys(monthNamesMappings.bn).forEach((enMonth) => {
    bengaliDate = bengaliDate.replace(
      new RegExp(enMonth, "g"),
      monthNamesMappings.bn[enMonth],
    );
  });

  // Replace ordinal suffixes (st, nd, rd, th)
  bengaliDate = replaceOrdinalSuffix(bengaliDate);

  return bengaliDate.trim();
};

export { toEnglish, toBengali };
