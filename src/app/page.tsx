"use client";
import { Suspense } from "react";
import Head from "next/head";

import MaxwidthWrapper from "@/components/ui/MaxwidthWrapper";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import Homepage from "@/components/Homepage";
import Footer from "@/components/Footer";

import { parseAsString, useQueryState } from "nuqs";
import { getTranslation } from "@/lib/translations";
import { getFontClass } from "@/lib/fontLoader";

const GetComponent = ({
  lang,
  setLang,
}: {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const translation = getTranslation(lang);
  return (
    <div className={getFontClass(lang)}>
      <Head>
        <title>{translation.title}</title>
      </Head>
      <Navbar lang={lang} setLang={setLang} />
      <Banner />
      <MaxwidthWrapper>
        {/* <header className="my-5 inline-block text-xl font-bold text-red-700 decoration-sky-600 underline-offset-4 hover:underline dark:text-red-500">
          <Link href="https://github.com/Nusab19/shohid24">
            Site is still under development &rarr;
          </Link>
        </header> */}
        <Hero translation={translation} />
        <Homepage translation={translation} />
      </MaxwidthWrapper>
      <Footer translation={translation} />
    </div>
  );
};

const Home_Sus = () => {
  const [lang, setLang] = useQueryState(
    "lang",
    parseAsString.withDefault("bn"),
  );
  return <GetComponent lang={lang as "en" | "bn"} setLang={setLang} />;
};

function Home() {
  return (
    <Suspense fallback={<GetComponent lang="bn" setLang={() => {}} />}>
      <Home_Sus />
    </Suspense>
  );
}

export default Home;
