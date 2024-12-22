"use client";
import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "@/components/ui/MaxwidthWrapper";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { getTranslation } from "@/lib/translations";
import ProfilePage from "./ProfilePage";
import { Martyr } from "@/lib/types";

const SuspendMain = ({ martyr }: { martyr: Martyr }) => {
  const [lang, setLang] = useQueryState(
    "lang",
    parseAsString.withDefault("bn"),
  );
  const translation = getTranslation(lang);
  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <MaxWidthWrapper>
        <ProfilePage martyr={martyr} lang={lang as "bn"|"en"}/>
      </MaxWidthWrapper>
      <Footer translation={translation} />
    </>
  );
};

const MainSection = ({ martyr }: { martyr: Martyr }) => {
  return (
    <Suspense
      fallback={
        <>
          <Navbar lang="bn" setLang={() => {}} />
          <MaxWidthWrapper>
            <ProfilePage martyr={martyr} lang="bn"/>
          </MaxWidthWrapper>
          <Footer translation={getTranslation("bn")} />
        </>
      }
    >
      <SuspendMain martyr={martyr} />
    </Suspense>
  );
};

export default MainSection;
