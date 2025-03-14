"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Github, Twitter } from "lucide-react";

import MaxWidthWrapper from "./ui/MaxwidthWrapper";
import { getTranslation } from "@/components/translations";
import { getFontClass } from "@/lib/fontLoader";
import { cn } from "@/lib/utils";

const Footer = ({ lang }: { lang: "bn" | "en" }) => {
  const translation = getTranslation(lang);

  const footerLinks = [
    { name: translation.aboutName, href: "/about" },
    { name: translation.contactName, href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/Shohid24FB" },
    { icon: Twitter, href: "https://x.com/Shohid24X" },
    { icon: Github, href: "https://github.com/shohid24/shohid24/" },
  ];

  return (
    <footer className="border-t border-border">
      <MaxWidthWrapper className={`py-10 ${getFontClass(translation.lang)}`}>
        {/* Top section with logo and links */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Left side - Logo and description */}
          <div className="space-y-4 md:max-w-sm">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Image
                priority
                src="/images/icon.svg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-md border"
              />
              <span className="text-xl font-bold text-primary">
                {translation.logoName}
              </span>
            </div>
            <p className="text-sm tracking-wide text-muted-foreground">
              {translation.footerText}
            </p>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="sr-only">
                    {social.href.split("https://")[1]}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Links */}
          <div className="hidden space-y-3 md:block">
            <h3 className="text-sm font-bold tracking-wider text-primary">
              {translation.lang === "en" ? "Quick Links" : "দ্রুত লিঙ্ক"}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-10 border-t border-border pt-6">
          <p
            className={cn(
              "text-center text-xs text-muted-foreground selection:bg-blue-600/85 selection:text-gray-50 selection:dark:bg-blue-800 selection:dark:text-gray-100 md:text-sm",
              translation.lang == "en" && "font-mono tracking-tighter",
            )}
          >
            &copy; 2024 - {new Date().getFullYear()}{" "}
            {translation.maintainerText}
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
