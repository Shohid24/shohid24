import { toBengali } from "@/lib/helpers/date";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EDIT_PROFILE_LINK } from "@/lib/constants";

export const ENGLISH = {
  lang: "en",
  logoName: "Shohid24",
  generateTitle: (name: string) => `Profile of ${name} - Shohid24`,
  title: "Profile of a martyr - Shohid24",
  description:
    "The profile of a martyr in the July Student Movement that happened in Bangladesh in 2024",
  unavailable: "No information",
  verified: "Data has been verified",
  notVerified: "Data has not been verified",
  hidden: "This profile was marked to be hidden from the list",
  lastModified: "Last Modified:",
  age: "Age:",
  gender: "Gender:",
  born: "Birth Date:",
  birthPlace: "Date of Birth:",
  howHeDied: "How he became a martyr:",
  biography: "Biography:",
  otherInfo: "Other Information:",
  sources: "Source:",
  giveUsInfo: (name: string, id: string) => (
    <div>
      Did you find any misinformation of <b>{name}</b>?
      <br />
      Or you want to give more information?
      <Button
        variant="outline"
        className="block font-semibold text-red-600 dark:text-red-500"
        asChild
      >
        <Link href={`${EDIT_PROFILE_LINK}/${id}`} target="_blank">
          Give information of {name}
        </Link>
      </Button>
    </div>
  ),
  findHeader: "Find a Martyr by ID",
  findDescription: (totalMartyrs: number) => (
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
  verified: "ডেটা যাচাই করা হয়েছে",
  notVerified: "ডেটা যাচাই করা হয়নি",
  hidden: "এই প্রোফাইলটি তালিকা থেকে আড়াল করার জন্য চিহ্নিত করা হয়েছে",
  lastModified: "সর্বশেষ পরিবর্তন:",
  age: "বয়সঃ",
  gender: "লিঙ্গঃ",
  born: "জন্ম তারিখঃ",
  birthPlace: "জন্মস্থানঃ",
  howHeDied: "যেভাবে শহীদ হয়েছেনঃ",
  biography: "জীবনীঃ",
  otherInfo: "অন্যান্য তথ্যঃ",
  sources: "সোর্সঃ",
  giveUsInfo: (name: string, id: string) => (
    <div>
      <b>{name}</b> এর তথ্যে কোনো অসঙ্গতি পেয়েছেন?
      <br />
      অথবা আরো তথ্য যুক্ত করতে চান?
      <Button
        variant="outline"
        className="block font-semibold text-red-600 dark:text-red-500"
        asChild
      >
        <Link href={`${EDIT_PROFILE_LINK}/${id}`} target="_blank">
          {name} এর তথ্য দিন
        </Link>
      </Button>
    </div>
  ),
  findHeader: "শহীদের আইডি দিয়ে খুঁজুন",
  findDescription: (totalMartyrs: number) => (
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
