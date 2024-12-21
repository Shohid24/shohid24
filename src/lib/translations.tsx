import Link from "next/link";
import { totalMartyrs } from "./helpers/search";
import { DateConverter } from "./helpers/date";

export const ENGLISH = {
  lang: "en",
  logoName: "Shohid24",
  title: "Shohid24 - Martyrs of July Student Movement",
  description:
    "A list of students killed under the regime of Bangladesh's Prime Minister, Sheikh Hasina, accused of fascist practices.",
  aboutName: "About Us",
  submitButton: "Submit a Martyr",
  martyrCount: String(totalMartyrs),
  header: (
    <>
      List of <span className="text-red-600 dark:text-red-500">martyrs</span> in the movement:
    </>
  ),
  searchPlaceholder: "Search by name, institution or profession (ctrl+k)",
  footerText: (
    <>&copy; {new Date().getFullYear()} Shohid24</>
  ),
  maintainerText: (
    <>
      Maintained by{" "}
      <Link
        href="https://nusab19.pages.dev"
        className="px-1 underline decoration-sky-600 underline-offset-2 transition-all duration-150 hover:text-primary"
        target="_blank"
      >
        Nusab Taha
      </Link>
    </>
  ),
  poem:
    ((
      <>
        But the mother will always bear the pain, Who touched her son’s cold
        body in vain.
      </>
    ),
    (
      <>
        Perhaps you’ll forget in time’s embrace
        <br />
        The bloody crimes of ,
        <span className="text-red-600 dark:text-red-500">
          Hasina’s <span className="text-red-500 dark:text-red-400">face</span>
        </span>
        <br />
        But that mother will always remember
        <br />
        Who had touched her <span className="text-red-500">dead</span> son’s
        shoulder.
      </>
    )),
};

export const BANGLA = {
  lang: "bn",
  logoName: "শহীদ২৪",
  title: "শহীদ২৪ - জুলাই ছাত্র আন্দোলনের শহীদদের তালিকা",
  description:
    "স্বৈরাচারী শাসক শেখ হাসিনার আমলে জুলাই গণঅভ্যুত্থানে শহীদ হওয়া ব্যক্তিদের তালিকা",
  aboutName: "আমাদের সম্পর্কে",
  submitButton: "শহীদের তথ্য যোগ করুন",
  martyrCount: DateConverter.toBengali(totalMartyrs),
  header: (
    <>
      আন্দোলনে <span className="text-red-600 dark:text-red-500">শহীদদের</span>{" "}
      তালিকাঃ
    </>
  ),
  searchPlaceholder: "নাম, প্রতিষ্ঠান বা পেশা সার্চ করুন (ctrl+k)",
  footerText: (
    <span className="tracking-wide">
      &copy; {DateConverter.toBengali(new Date().getFullYear())} শহীদ২৪
    </span>
  ),
  maintainerText: (
    <>
      রক্ষণাবেক্ষণে{" "}
      <Link
        href="https://nusab19.pages.dev"
        className="px-1 underline decoration-sky-600 underline-offset-4 transition-all duration-150 hover:text-primary"
        target="_blank"
      >
        নুসাব তাহা
      </Link>
    </>
  ),
  poem: (
    <>
      তোমরা হয়তো যাইবা ভুলে
      <br />
      <span className="text-red-500 dark:text-red-400">
        খুনি <span className="text-red-600 dark:text-red-500">হাসিনার</span>
      </span>{" "}
      ইতিহাস,
      <br />
      সে মায়ে রাখবো মনে
      <br />
      যে ছুঁইছে পোলার <span className="text-red-500">লাশ</span>।
    </>
  ),
};

export function getTranslation(lang: string) {
  return lang === "bn" ? BANGLA : ENGLISH;
}

export type Translation = typeof ENGLISH;
