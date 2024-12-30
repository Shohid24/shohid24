"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Main from "./components/Main";
import { getTranslation } from "./components/translations";
import { parseAsString, useQueryState } from "nuqs";
import React, { Suspense, useEffect } from "react";

const SuspendedAbout = () => {
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
      <title>{translation.title}</title>
      <Navbar lang={lang} setLang={setLang} />
      <Main translation={translation} />
      <Footer lang={lang as "bn" | "en"} />
    </>
  );
};

const AboutPage = () => {
  const lang = "bn";
  const translation = getTranslation(lang);
  return (
    <Suspense
      fallback={
        <>
          <title>{translation.title}</title>
          <Navbar lang={lang} setLang={() => {}} />
          <Main translation={translation} />
          <Footer lang={lang as "bn" | "en"} />
        </>
      }
    >
      <SuspendedAbout />
    </Suspense>
  );
};

export default AboutPage;
