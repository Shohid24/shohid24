"use client";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

import MaxwidthWrapper from "@/components/ui/MaxwidthWrapper";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Homepage from "@/components/Homepage";
import Footer from "@/components/Footer";

import { parseAsString, useQueryState } from "nuqs";
import { getTranslation } from "@/components/translations";
import { getFontClass } from "@/lib/fontLoader";
import LastUpdatedJson from "./../../../../public/lastUpdated.json";
import RelativeTime from "@/components/sub/RelativeTime";

const GetComponent = ({
  lang,
  setLang,
}: {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const translation = getTranslation(lang);
  useEffect(() => {
    document.title = translation.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translation.description);
  }, [translation]);
  return (
    <div className={getFontClass(lang)}>
      <Head>
        <title>{translation.title}</title>
      </Head>
      <Navbar lang={lang} setLang={setLang} />
      <Banner />
      <MaxwidthWrapper>
        <Link
          href="https://forms.gle/efEVqZEHHR4fZuyG7"
          className="inline-block rounded-full bg-red-600 p-2.5 text-lg font-bold text-gray-100 underline decoration-red-300 underline-offset-4 shadow-lg shadow-red-700/50 transition-all duration-100 hover:scale-[1.01] hover:bg-red-700 hover:shadow-red-700/70 md:p-3 md:text-xl lg:text-2xl"
          target="_blank"
        >
          {translation.submitButton}
        </Link>
        {/* <Hero translation={translation} /> */}
        <Homepage translation={translation} />
        <RelativeTime
          className="mt-10"
          utcTime={LastUpdatedJson.lastUpdated}
          lang={lang as "bn" | "en"}
        />
      </MaxwidthWrapper>
      <Footer lang={lang as "bn" | "en"} />
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
