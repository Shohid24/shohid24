"use client";
import { Suspense, useState } from "react";

import { Inter } from "next/font/google";

import MaxwidthWrapper from "@/components/ui/MaxwidthWrapper";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import Homepage from "@/components/Homepage";
import Footer from "@/components/Footer";
import Link from "next/link";

import { parseAsString, useQueryState } from "nuqs";

const interFont = Inter({ subsets: ["latin"] });

const GetComponent = ({
  lang,
  setLang,
}: {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <Banner />
      <MaxwidthWrapper className={lang=="en" ? interFont.className : ""}>
        {/* <header className="my-5 inline-block text-xl font-bold text-red-700 decoration-sky-600 underline-offset-4 hover:underline dark:text-red-500">
          <Link href="https://github.com/Nusab19/shohid24">
            Site is still under development &rarr;
          </Link>
        </header> */}
        <Hero lang={lang} />
        <Homepage lang={lang} />
      </MaxwidthWrapper>
      <Footer lang={lang} />
    </>
  );
};

const Home_Sus = () => {
  const [lang, setLang] = useQueryState(
    "lang",
    parseAsString.withDefault("bn"),
  );
  return <GetComponent lang={lang} setLang={setLang} />;
};

function Home() {
  return (
    <Suspense fallback={<GetComponent lang="bn" setLang={() => {}} />}>
      <Home_Sus />
    </Suspense>
  );
}

export default Home;
