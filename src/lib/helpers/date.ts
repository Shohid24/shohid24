// Types for better code organization and type safety
type NumericMapping = { [key: string]: string };
type MonthNameMappings = {
  en: { [key: string]: string };
  bn: { [key: string]: string };
};

type BengaliOrdinalIndicator = {
  default: string;
  special: { [key: string]: string };
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

// Month name mappings
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

// Bengali ordinal indicators
const bengaliOrdinalIndicators: BengaliOrdinalIndicator = {
  default: "ই",
  special: {
    "1": "লা",
    "2": "রা",
    "3": "রা",
    "4": "ঠা",
    "5": "ই",
    "6": "ই",
    "7": "ই",
    "8": "ই",
    "9": "ই",
    "0": "ই",
  },
};

/**
 * Gets the appropriate Bengali ordinal indicator for a number
 */
const getBengaliOrdinalIndicator = (num: string): string => {
  const lastDigit = num.slice(-1);
  return (
    bengaliOrdinalIndicators.special[lastDigit] ||
    bengaliOrdinalIndicators.default
  );
};

/**
 * Converts English numbers to Bengali numbers
 */
const convertToBengaliNumerals = (str: string): string => {
  return str.replace(
    /\d/g,
    (match) => englishToBengaliNumerals[match] || match,
  );
};

/**
 * Formats the date part with appropriate Bengali ordinal indicator
 */
const formatBengaliDate = (date: string): string => {
  const bengaliNum = convertToBengaliNumerals(date);
  const ordinalIndicator = getBengaliOrdinalIndicator(date);
  return `${bengaliNum}${ordinalIndicator}`;
};

/**
 * Removes English ordinal suffixes (st, nd, rd, th)
 */
const removeOrdinalSuffix = (dateString: string): string => {
  return dateString.replace(/(\d+)(st|nd|rd|th)/gi, "$1");
};

/**
 * Converts a Bengali date to an English date
 */
const toEnglish = (bengaliDate: string): string => {
  // Remove Bengali ordinal indicators
  let englishDate = bengaliDate.replace(/[লাইরাঠা]/g, "");

  // Convert Bengali numerals to English
  englishDate = englishDate
    .split("")
    .map((char) => bengaliToEnglishNumerals[char] || char)
    .join("");

  // Convert month names
  Object.entries(monthNamesMappings.en).forEach(([bnMonth, enMonth]) => {
    englishDate = englishDate.replace(new RegExp(bnMonth, "g"), enMonth);
  });

  return englishDate.trim();
};

/**
 * Converts an English date to a Bengali date
 */
const toBengali = (englishDate: string | number): string => {
  let dateStr = String(englishDate);

  // Remove existing ordinal suffixes
  dateStr = removeOrdinalSuffix(dateStr);

  // Extract date components
  const dateMatch = dateStr.match(/(\d+)\s*([A-Za-z]+),?\s*(\d+)/);
  if (!dateMatch) return convertToBengaliNumerals(dateStr);

  const [_, day, month, year] = dateMatch;

  // Format date parts
  const bengaliDay = formatBengaliDate(day);
  const bengaliMonth = monthNamesMappings.bn[month] || month;
  const bengaliYear = convertToBengaliNumerals(year);

  return `${bengaliDay} ${bengaliMonth}, ${bengaliYear}`;
};

export { toEnglish, toBengali };
