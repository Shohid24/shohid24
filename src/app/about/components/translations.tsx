import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ENGLISH = {
  title: "About Shohid24 - Listing all the martyrs of July Movement",
  giveUsInfo: (
    <>
      It is difficult for us to collect all the information alone. If you have
      any more information about this martyr, please provide it to us.
      <Button
        variant="outline"
        className="font-semibold text-red-600 dark:text-red-500"
      >
        Give us information
      </Button>
    </>
  ),
  header: "Why this website?",
  motto: "We will not let our bothers' blood go in vein",
  aboutText: (
    <>
      During the July uprising, countless people became martyrs. By sheer luck,
      we are not on that list. However, it includes our brothers, friends, and
      loved ones. <br />
      We do not have the means to repay their sacrifice. But this effort is to
      remember them and inform the next generation. <br />
      Out of thousands of martyrs, we might have only been able to list a few
      hundred. Many have been left out. <br />
      If you have information about anyone, please let us know and help.
      <br />
      <br />
      These martyr brothers and sisters fought alongside us,{" "}
      <span className="font-semibold">for us</span>. Therefore, we must not
      forget them. <br />
      We must ensure that their sacrifices do not go in vain. <br />
      We cannot betray our country. They gave their lives in the July movement,
      we too must be prepared to give our lives for the country anytime in the
      future.
      <br />
      <br />
      All the source code and data of this website are publicly available on
      GitHub. <br />
      We first saw the list of martyrs on{" "}
      <Link
        href="https://shohid.info"
        target="_blank"
        className="italic text-blue-700 underline-offset-2 hover:underline dark:text-blue-400"
      >
        shohid.info
      </Link>
      . Due to their website often being down and the code not being public, we
      feared losing the data, which led to the decision to create this website.{" "}
      <br />
      The initial information was collected from their website. After refining
      and making some corrections, it was given here. <br />
      If we remain alive, we will regularly update this information. Your
      cooperation is greatly needed. <br />
    </>
  ),
};

export const BANGLA = {
  logoName: "শহীদ২৪",
  title:
    "শহীদ২৪ ওয়েবসাইটটি বাংলাদেশের জুলাই ছাত্র আন্দোলনে শহীদদের একটি তালিকা করেছে। এর মাধ্যমে স্বৈরাচারী শেখ হাসিনা কীভাবে হাজার-হাজার নিস্পাপ প্রাণ কেড়ে নিয়েছে সেটার একটি ধারণা পাওয়া যায়।",
  giveUsInfo: (
    <>
      আমাদের একার পক্ষে সকল তথ্য সংগ্রহ করা কষ্টসাধ্য। এই শহীদের ব্যাপারে আর
      কোনো তথ্য জানা থাকলে অনুগ্রহ করে আমাদের তথ্য দিয়ে সহায়তা করুন।
      <Button
        variant="outline"
        className="font-semibold text-red-600 dark:text-red-500"
      >
        আমাদের তথ্য দিন
      </Button>
    </>
  ),
  header: "কেন এই ওয়েবসাইট?",
  motto: "আমরা আমাদের ভাইদের রক্ত বিফলে যেতে দিবো না",
  aboutText: (
    <>
      জুলাইয়ের গণঅভ্যুত্থানে অসংখ্য মানুষ শহীদ হয়েছেন। ভাগ্যক্রমে আমরা সেই
      তালিকায় নেই। তবে আছে আমাদের ভাই, বন্ধু ও আপনজন। <br />
      তাদের এই আত্মত্যাগের ঋণ শোধ করার সামর্থ্য আমাদের নেই। তবে তাদের স্মরণে
      রেখে পরবর্তী প্রজন্মকে জানানোর জন্যই আমাদের এই প্রচেষ্টা। <br />
      সহস্রাধিক শহীদের মধ্য থেকে হয়তো আমরা শুধু কয়েকশজনের তালিকাই করতে পেরেছি।
      অনেকেই বাদ পড়ে গেছেন। <br />
      এমন কারো সম্পর্কে জানা থাকলে অনুগ্রহ করে আমাদের জানিয়ে সহায়তা করুন।
      <br />
      <br />
      এসকল শহীদ ভাই-বোনেরা আমাদের সাথেই লড়েছেন,{" "}
      <span className="font-semibold">আমাদের জন্যই</span> লড়েছেন। তাই তাদের
      ভুলে গেলে চলবে না। <br />
      তাদের এই আত্মত্যাগ যাতে বিফলে না যায় সেদিকেও লক্ষ্য রাখতে হবে। <br />
      দেশের সাথে বেইমানি করা চলবে না। তাঁরা জুলাইয়ের আন্দোলনে জীবন দিয়েছেন,
      সামনে দেশের জন্য জীবন দিতে আমাদেরও প্রস্তুত থাকতে হবে।
      <br />
      <br />
      এই ওয়েবসাইটটির সকল সোর্স কোড এবং ডেটা গিটহাবে পাবলিকলি দেওয়া আছে।
      <br />
      সর্বপ্রথম{" "}
      <Link
        href="https://shohid.info"
        target="_blank"
        className="italic text-blue-700 underline-offset-2 hover:underline dark:text-blue-400"
      >
        shohid.info
      </Link>
      -তে শহীদদের লিস্ট দেখতে পাই। তাদের ওয়েবসাইট অনেক সময় ডাউন থাকায় ও কোড
      পাবলিক না থাকায় ডেটা হারিয়ে যাওয়ার ভয় থেকে আমাদের এই ওয়েবসাইট বানানোর
      সিদ্ধান্ত। <br />
      প্রাথমিক তথ্যগুলো তাদের ওয়েবসাইট থেকেই সংগ্রহ করা। এরপর সেই তথ্য
      পরিমার্জন ও কিছু সংশোধন করে এখানে দেওয়া হয়েছে। <br />
      বেঁচে থাকলে নিয়মিত এসকল তথ্য আপডেট করা হবে। এজন্য আপনাদের সহায়তা একান্ত
      কাম্য। <br />
    </>
  ),
};

export function getTranslation(lang: string) {
  return lang === "bn" ? BANGLA : ENGLISH;
}

export type Translation = typeof ENGLISH;
