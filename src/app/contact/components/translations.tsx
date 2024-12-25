import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ENGLISH = {
  title: "About Shohid24 - Listing all the martyrs of July Movement",
};

export const BANGLA = {
  title:
    "শহীদ২৪ ওয়েবসাইটটি বাংলাদেশের জুলাই ছাত্র আন্দোলনে শহীদদের একটি তালিকা করেছে। এর মাধ্যমে স্বৈরাচারী শেখ হাসিনা কীভাবে হাজার-হাজার নিস্পাপ প্রাণ কেড়ে নিয়েছে সেটার একটি ধারণা পাওয়া যায়।",
};

export function getTranslation(lang: string) {
  return lang === "bn" ? BANGLA : ENGLISH;
}

export type Translation = typeof ENGLISH;
