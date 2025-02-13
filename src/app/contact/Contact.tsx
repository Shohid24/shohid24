"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getTranslation } from "./components/translations";
import { parseAsString, useQueryState } from "nuqs";
import React, { Suspense, useEffect } from "react";
import MaxWidthWrapper from "@/components/ui/MaxwidthWrapper";
import { Separator } from "@/components/ui/separator";
import Anchor from "@/components/ui/Anchor";

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
      <MaxWidthWrapper className="text-start mb-52">
        <h1 className="my-3 mb-5 text-2xl font-semibold underline underline-offset-4 md:text-3xl lg:text-4xl">
          {translation.header}
        </h1>
        <p className="text-base animate-in fade-in-50 md:text-lg">
          {translation.text}
        </p>
        <Separator className="my-3" />
        <div className="flex flex-col items-start justify-center gap-1.5 text-base md:text-lg">
          <Item label={translation.labelEmail} link={translation.email} />
          <Item
            label={translation.labelPersonal}
            link={translation.telegramPersonal}
          />
          <Item
            label={translation.labelGroup}
            link={translation.telegramGroup}
          />
          <Item
            label={translation.labelChannel}
            link={translation.telegramChannel}
          />
        </div>
      </MaxWidthWrapper>
      <Footer lang={lang as "en" | "bn"} />
    </>
  );
};

function Item({ label, link }: { label: string; link: string }) {
  return (
    <div className="flex items-center">
      <span className="mr-1">{label}</span>
      <Anchor href={link} className="-ml-2 md:text-lg" target="_blank">
        {link.replace("mailto:", "").replace("https://", "")}
      </Anchor>
    </div>
  );
}

function Contact() {
  return (
    <Suspense>
      <SuspendedContact />
    </Suspense>
  );
}

export default Contact;
