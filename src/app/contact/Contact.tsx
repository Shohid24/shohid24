"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getTranslation } from "./components/translations";
import { parseAsString, useQueryState } from "nuqs";
import type React from "react";
import { Suspense, useEffect } from "react";
import MaxWidthWrapper from "@/components/ui/MaxwidthWrapper";
import { Mail, Facebook } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TelegramIcon, TwitterXIcon } from "@/lib/icons";
import Link from "next/link";

const SuspendedContact = () => {
  const [lang, setLang] = useQueryState(
    "lang",
    parseAsString.withDefault("bn"),
  );
  const translation = getTranslation(lang);

  useEffect(() => {
    document.title = translation.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translation.description);
  }, [translation]);

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <MaxWidthWrapper className="mb-24 text-start">
        <div className="py-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {translation.header}
          </h1>
          <p className="mb-8 text-base text-muted-foreground animate-in fade-in-50 md:text-lg">
            {translation.text}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <ContactCard
              icon={<Mail className="h-6 w-6 text-primary" />}
              title={translation.labelEmail}
              content={translation.email.replace("mailto:", "")}
              link={translation.email}
            />

            {/* Facebook */}
            <ContactCard
              icon={<Facebook className="h-6 w-6 text-primary" />}
              title={translation.labelFacebook || "Facebook"}
              content="fb.com/Shohid24FB"
              link={translation.fbLink}
            />

            {/* Twitter X */}
            <ContactCard
              icon={TwitterXIcon}
              title={translation.labelX || "Twitter"}
              content="x. com/Shohid24"
              link={translation.xLink}
            />

            {/* Telegram Group */}
            <ContactCard
              icon={TelegramIcon}
              title={translation.labelGroup}
              content={translation.telegramGroup.replace("https://", "")}
              link={translation.telegramGroup}
            />

            {/* Telegram Channel */}
            <ContactCard
              icon={TelegramIcon}
              title={translation.labelChannel}
              content={translation.telegramChannel.replace("https://", "")}
              link={translation.telegramChannel}
            />

            {/* Telegram Personal */}
            <ContactCard
              icon={TelegramIcon}
              title={translation.labelPersonal}
              content={translation.telegramPersonal.replace("https://", "")}
              link={translation.telegramPersonal}
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer lang={lang as "bn" | "en"} />
    </>
  );
};

const ContactCard = ({
  icon,
  title,
  content,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <Link
          href={link ?? ""}
          target={link?.startsWith("http") ? "_blank" : undefined}
          rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-start gap-4 p-6"
        >
          <div className="mt-1 rounded-full bg-muted p-2">{icon}</div>
          <div>
            <h3 className="mb-1 text-lg font-medium">{title}</h3>
            <p className="text-primary hover:underline">{content}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

const ContactForm = ({ translation }: { translation: any }) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            {translation.formName || "Name"}
          </label>
          <input
            id="name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={translation.formNamePlaceholder || "Your name"}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            {translation.formEmail || "Email"}
          </label>
          <input
            id="email"
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={translation.formEmailPlaceholder || "Your email"}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          {translation.formSubject || "Subject"}
        </label>
        <input
          id="subject"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={translation.formSubjectPlaceholder || "Message subject"}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          {translation.formMessage || "Message"}
        </label>
        <textarea
          id="message"
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={translation.formMessagePlaceholder || "Your message"}
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {translation.formSubmit || "Send Message"}
      </button>
    </form>
  );
};

function Contact() {
  return (
    <Suspense>
      <SuspendedContact />
    </Suspense>
  );
}

export default Contact;
