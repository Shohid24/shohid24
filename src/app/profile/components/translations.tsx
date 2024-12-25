import { totalMartyrs } from "@/lib/helpers/search";
import { toBengali } from "@/lib/helpers/date";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ENGLISH = {
  lang: "en",
  logoName: "Shohid24",
  generateTitle: (name: string) => `Profile of ${name} - Shohid24`,
  title: "Profile of a martyr - Shohid24",
  description:
    "The profile of a martyr in the July Student Movement that happened in Bangladesh in 2024",
  unavailable: "No information",
  age: "Age:",
  born: "Birth Date:",
  birthPlace: "Date of Birth:",
  howHeDied: "How he became a martyr:",
  biography: "Biography:",
  otherInfo: "Other Information:",
  giveUsInfo: (
    <>
      It is difficult for us to collect all the information alone. If you have
      any more information about this martyr, please provide it to us.
      <Button
        variant="outline"
        className="font-semibold text-red-600 dark:text-red-500"
        asChild
      >
        <Link href="https://forms.gle/efEVqZEHHR4fZuyG7" target="_blank">
          Give us information
        </Link>
      </Button>
    </>
  ),
  findHeader: "Find a Martyr by ID",
  findDescription: (
    <>
      We currently have
      <span className="px-1 font-bold text-red-500 dark:text-red-600">
        {totalMartyrs}
      </span>
      martyrs listed. If you have the ID number of a person, enter it below to
      view their page.
    </>
  ),
  findPlaceholder: "Enter the martyr's ID",
  findSubmit: "Submit",
};

export const BANGLA = {
  lang: "bn",
  logoName: "শহীদ২৪",
  generateTitle: (name: string) => `${name} এর প্রোফাইল - শহীদ২৪`,
  title: "শহীদ২৪ - জুলাই ছাত্র আন্দোলনের শহীদদের তালিকা",
  description:
    "স্বৈরাচারী শাসক শেখ হাসিনার আমলে জুলাই গণঅভ্যুত্থানে শহীদ হওয়া ব্যক্তিদের তালিকা",

  unavailable: "তথ্য অনুপস্থিত",
  age: "বয়সঃ",
  born: "জন্ম তারিখঃ",
  birthPlace: "জন্মস্থানঃ",
  howHeDied: "যেভাবে শহীদ হয়েছেনঃ",
  biography: "জীবনীঃ",
  otherInfo: "অন্যান্য তথ্যঃ",
  giveUsInfo: (
    <>
      আমাদের একার পক্ষে সকল তথ্য সংগ্রহ করা কষ্টসাধ্য। এই শহীদের ব্যাপারে আর
      কোনো তথ্য জানা থাকলে অনুগ্রহ করে আমাদের তথ্য দিয়ে সহায়তা করুন।
      <Button
        variant="outline"
        className="font-semibold text-red-600 dark:text-red-500"
        asChild
      >
        <Link href="https://forms.gle/efEVqZEHHR4fZuyG7" target="_blank">
          আমাদের তথ্য দিন
        </Link>
      </Button>
    </>
  ),
  findHeader: "আইডি দিয়ে শহীদ খুঁজুন",
  findDescription: (
    <>
      বর্তমানে আমাদের তালিকায়
      <span className="px-1 font-bold text-red-500 dark:text-red-600">
        {toBengali(totalMartyrs)}
      </span>
      জন শহীদের নাম রয়েছে। যদি আপনার কাছে কোনো ব্যক্তির আইডি নম্বর থাকে, তবে তা
      নিচে লিখুন এবং তাদের পৃষ্ঠাটি দেখুন।
    </>
  ),
  findPlaceholder: "শহীদের আইডি লিখুন",
  findSubmit: "সাবমিট",
};

export function getTranslation(lang: string) {
  return lang === "bn" ? BANGLA : ENGLISH;
}

export type Translation = typeof ENGLISH;
