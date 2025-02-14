import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelativeTimeProps {
  utcTime: string; // ISO UTC timestamp
  lang: "en" | "bn";
  className?: string;
}

const RelativeTime: React.FC<RelativeTimeProps> = ({
  utcTime,
  lang,
  className,
}) => {
  const getRelativeTime = (utcDateString: string, language: "en" | "bn") => {
    const utcDate = new Date(utcDateString);
    const today = new Date();

    // Reset time portion to compare just dates
    utcDate.setUTCHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - utcDate.getTime());
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    if (language === "bn") {
      if (diffDays === 0) return "আজ";
      if (diffDays === 1) return "গতকাল";

      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      const weeks = Math.floor((diffDays % 30) / 7);
      const remainingDays = diffDays % 7;

      if (years > 0) {
        return `${convertToBengaliNumbers(years)} বছর আগে`;
      }
      if (months > 0) {
        return `${convertToBengaliNumbers(months)} মাস আগে`;
      }
      if (weeks > 0) {
        return `${convertToBengaliNumbers(weeks)} সপ্তাহ আগে`;
      }
      return `${convertToBengaliNumbers(remainingDays)} দিন আগে`;
    } else {
      if (diffDays === 0) return "today";
      if (diffDays === 1) return "yesterday";

      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      const weeks = Math.floor((diffDays % 30) / 7);
      const remainingDays = diffDays % 7;

      if (years > 0) {
        return `${years} year${years > 1 ? "s" : ""} ago`;
      }
      if (months > 0) {
        return `${months} month${months > 1 ? "s" : ""} ago`;
      }
      if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      }
      return `${remainingDays} day${remainingDays > 1 ? "s" : ""} ago`;
    }
  };

  const convertToBengaliNumbers = (number: number): string => {
    const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => bengaliNumerals[parseInt(digit)])
      .join("");
  };

  // Format date for SEO-friendly datetime attribute
  const formatDateForSEO = (utcDateString: string): string => {
    const date = new Date(utcDateString);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm tracking-wide text-primary/70",
        className,
      )}
    >
      <Clock className="text-emerald-500" strokeWidth={2} size={18} />
      <span className="font-normal">
        {lang === "bn" ? "সর্বশেষ পরিবর্তন:" : "Last Modified:"}
      </span>
      <time dateTime={formatDateForSEO(utcTime)} className="font-semibold">
        {getRelativeTime(utcTime, lang)}
      </time>
    </div>
  );
};

export default RelativeTime;
