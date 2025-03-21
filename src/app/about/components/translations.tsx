import Link from "next/link";
import { Button } from "@/components/ui/button";

const CreditWebsites = [
  "bssnews.net",
  "bdarchives.org",
  "kalerkantho.com",
  "talesofjuly-sd.blogspot.com",
  "shohid.info",
  "redjuly.live",
];

export const ENGLISH = {
  lang: "en",
  title: "About Shohid24 - Listing all the martyrs of July Movement",
  description:
    "Shohid24 is a website that lists the martyrs of the July Student Movement in Bangladesh. It provides an insight into how the autocratic Sheikh Hasina took thousands of innocent lives.",
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
      You may have seen other initiatives to list the martyrs as well. So, what sets
      us apart?
      <br />
      While many similar initiatives have been started, most have stopped at
      some point. Currently, we are the only ones still actively adding and
      updating data regularly.
      <br />
      Our database is the largest and most up-to-date among all similar efforts.
      Additionally, all the source code and data for this website are publicly
      available on GitHub.
      <br />
      <br />
      We express our gratitude to the following websites and news portals for
      providing information at various times.
      <ul className="mb-5 mt-2">
        {CreditWebsites.map((website) => (
          <li key={website} className="ml-4 list-disc">
            <Link
              href={`https://${website}`}
              target="_blank"
              className="italic text-blue-700 underline-offset-2 hover:underline dark:text-blue-400"
            >
              {website}
            </Link>
          </li>
        ))}
      </ul>
      <br />
      InShaAllah we will try to regularly update this information. Your cooperation is
      greatly needed. <br />
    </>
  ),
};

export const BANGLA = {
  lang: "bn",
  logoName: "শহীদ২৪",
  title: "শহীদ২৪ সম্পর্কে - জুলাই আন্দোলনে শহীদদের তালিকা",
  description:
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
      শহীদদের তালিকাভুক্ত করার জন্য এরকম উদ্যোগ অনেকেই নিয়েছেন। তাহলে আমরা
      কীভাবে আলাদা?
      <br />
      যদিও অনেকেই এ ধরনের উদ্যোগ শুরু করেছিলেন, তাদের বেশিরভাগই কোনো না কোনো
      সময়ে গিয়ে থেমে গিয়েছেন। বর্তমানে, একমাত্র আমরাই নিয়মিত তথ্য সংযোজন এবং
      পরিমার্জন করছি।
      <br />
      আমাদের ডেটাবেজ আপাতত সবচেয়ে সমৃদ্ধ এবং অনুরূপ সব প্রচেষ্টার মধ্যে সবচেয়ে
      আপ-টু-ডেট। এছাড়াও, আমাদের ওয়েবসাইটের সমস্ত সোর্স কোড এবং তথ্য গিটহাবে
      পাবলিক করে রাখা হয়েছে।
      <br />
      <br />
      বিভিন্ন সময় তথ্যাবলি সংগ্রহ করতে পারায় নিচের ওয়েবসাইট এবং নিউজ
      পোর্টালদেরকে আমাদের আন্তরিক কৃতজ্ঞতা জানাই।
      <ul className="mb-5 mt-2">
        {CreditWebsites.map((website) => (
          <li key={website} className="ml-4 list-disc">
            <Link
              href={`https://${website}`}
              target="_blank"
              className="italic text-blue-700 underline-offset-2 hover:underline dark:text-blue-400"
            >
              {website}
            </Link>
          </li>
        ))}
      </ul>
      <br />
      ইনশাআল্লাহ্‌ আমরা নিয়মিতভাবে এই তথ্যগুলি আপডেট করার চেষ্টা করব। এজন্য আপনাদের সহায়তা
      একান্ত কাম্য। <br />
    </>
  ),
};

export function getTranslation(lang: string) {
  return lang === "bn" ? BANGLA : ENGLISH;
}

export type Translation = typeof ENGLISH;
