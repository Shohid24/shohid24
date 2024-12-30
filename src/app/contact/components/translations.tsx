import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ENGLISH = {
  title: "Contact Us - Shohid24",
  description:
    "If you need to correct any martyr information or have any issues, please contact us. Shohid24",
  header: "Contact Us",
  text: "If you encounter any problems with the website or have any complaints, please contact us at the address below:",

  telegramChannel: "https://t.me/Shohid24Web",
  telegramGroup: "https://t.me/Shohid24Discussion",
  telegramPersonal: "https://t.me/Nusab19",
  email: "mailto:nusab19@duck.com",
  labelChannel: "Telegram Channel:",
  labelGroup: "Telegram Group:",
  labelPersonal: "Developer's Telegram:",
  labelEmail: "Email:",
};

export const BANGLA = {
  title: "আমাদের সাথে যোগাযোগ - শহীদ২৪",
  description:
    "শহীদদের তথ্য সংশোধন বা যেকোনো সমস্যায় আমাদের সাথে যোগাযোগ করুন। শহীদ২৪",
  header: "আমাদের সাথে যোগাযোগ করুন",
  text: "ওয়েবসাইটে কোনো সমস্যা থাকলে কিংবা কোনো অভিযোগ থাকলে নিচের ঠিকানায় আমাদের সাথে যোগাযোগ করুনঃ",
  telegramChannel: "https://t.me/Shohid24Web",
  telegramGroup: "https://t.me/Shohid24Discussion",
  telegramPersonal: "https://t.me/Nusab19",
  email: "mailto:nusab19@duck.com",
  labelChannel: "টেলিগ্রাম চ্যানেলঃ",
  labelGroup: "টেলিগ্রাম গ্রুপঃ",
  labelPersonal: "ডেভেলপারের টেলিগ্রামঃ",
  labelEmail: "ইমেইলঃ",
};

export function getTranslation(lang: string) {
  return lang === "bn" ? BANGLA : ENGLISH;
}

export type Translation = typeof ENGLISH;
