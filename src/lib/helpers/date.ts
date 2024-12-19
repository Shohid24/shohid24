// Define types for clarity
type NumericMapping = { [key: string]: string };
type MonthNameMappings = {
  en: { [key: string]: string };
  bn: { [key: string]: string };
};

export class DateConverter {
  private static bengaliToEnglishNumerals: NumericMapping = {
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

  private static englishToBengaliNumerals: NumericMapping = Object.fromEntries(
    Object.entries(this.bengaliToEnglishNumerals).map(([k, v]) => [v, k]),
  );

  // Mapping of month names
  private static monthNamesMappings: MonthNameMappings = {
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

  /**
   * Converts a Bengali date to an English date
   * @param bengaliDate - Date string in Bengali
   * @returns Date string in English
   */
  static toEnglish(bengaliDate: string): string {
    // Replace Bengali numerals with English numerals
    const englishNumerals = bengaliDate
      .split("")
      .map((char) => this.bengaliToEnglishNumerals[char] || char)
      .join("");

    // Replace Bengali month names with English month names
    let englishDate = englishNumerals;
    Object.keys(this.monthNamesMappings.en).forEach((bnMonth) => {
      englishDate = englishDate.replace(
        new RegExp(bnMonth, "g"),
        this.monthNamesMappings.en[bnMonth],
      );
    });

    return englishDate.trim();
  }

  /**
   * Converts an English date to a Bengali date
   * @param englishDate - Date string in English
   * @returns Date string in Bengali
   */
  static toBengali(englishDate: string): string {
    // Replace English numerals with Bengali numerals
    const bengaliNumerals = englishDate
      .split("")
      .map((char) => this.englishToBengaliNumerals[char] || char)
      .join("");

    // Replace English month names with Bengali month names
    let bengaliDate = bengaliNumerals;
    Object.keys(this.monthNamesMappings.bn).forEach((enMonth) => {
      bengaliDate = bengaliDate.replace(
        new RegExp(enMonth, "g"),
        this.monthNamesMappings.bn[enMonth],
      );
    });

    return bengaliDate.trim();
  }
}
