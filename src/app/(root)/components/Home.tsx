"use client";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { parseAsString, useQueryState } from "nuqs";

import MaxwidthWrapper from "@/components/ui/MaxwidthWrapper";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Homepage from "@/components/Homepage";
import Footer from "@/components/Footer";
import RelativeTime from "@/components/sub/RelativeTime";

import { getTranslation } from "@/components/translations";
import { getFontClass } from "@/lib/fontLoader";
import { Martyr } from "@/lib/types";

// Type for language options
type LanguageOption = "en" | "bn";

// Separate page head management into its own component
const PageHead = ({ lang }: { lang: LanguageOption }) => {
  const translation = getTranslation(lang);

  useEffect(() => {
    document.title = translation.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translation.description);
  }, [translation]);

  return (
    <Head>
      <title>{translation.title}</title>
    </Head>
  );
};

// Component for the submission button
const SubmissionButton = ({ text }: { text: string }) => (
  <Link
    href="https://forms.gle/efEVqZEHHR4fZuyG7"
    className="inline-block rounded-full bg-red-600 p-2.5 text-lg font-bold text-gray-100 underline decoration-red-300 underline-offset-4 shadow-lg shadow-red-700/50 transition-all duration-100 hover:scale-[1.01] hover:bg-red-700 hover:shadow-red-700/70 md:p-3 md:text-xl lg:text-2xl"
    target="_blank"
  >
    {text}
  </Link>
);

// Main content component with proper naming
const LanguageAwareContent = ({
  lang,
  setLang,
  data,
  lastUpdated,
}: {
  lang: LanguageOption;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  data: Martyr[];
  lastUpdated: string;
}) => {
  const translation = getTranslation(lang);

  return (
    <div className={getFontClass(lang)}>
      <PageHead lang={lang} />
      <Navbar lang={lang} setLang={setLang} />
      <Banner />
      <MaxwidthWrapper>
        <SubmissionButton text={translation.submitButton} />
        <Homepage translation={translation} data={data}/>
        <RelativeTime className="mt-10" utcTime={lastUpdated} lang={lang} />
      </MaxwidthWrapper>
      <Footer lang={lang} />
    </div>
  );
};

// Component with Suspense support
const SuspendedHome = ({
  data,
  lastUpdated,
}: {
  data: Martyr[];
  lastUpdated: string;
}) => {
  const [lang, setLang] = useQueryState(
    "lang",
    parseAsString.withDefault("bn"),
  );

  return (
    <LanguageAwareContent
      lang={lang as LanguageOption}
      setLang={setLang}
      data={data}
      lastUpdated={lastUpdated}
    />
  );
};

// Main Home component
const Home = ({
  data,
  lastUpdated,
}: {
  data: Martyr[];
  lastUpdated: string;
}) => {
  return (
    <Suspense
      fallback={
        <LanguageAwareContent
          lang="bn"
          setLang={() => {}}
          data={data}
          lastUpdated={lastUpdated}
        />
      }
    >
      <SuspendedHome data={data} lastUpdated={lastUpdated} />
    </Suspense>
  );
};

export default Home;
