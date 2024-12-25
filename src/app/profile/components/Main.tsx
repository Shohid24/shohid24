"use client";
import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "@/components/ui/MaxwidthWrapper";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { getTranslation } from "@/components/translations";
import ProfilePage from "./ProfilePage";
import { Martyr } from "@/lib/types";

const SuspendMain = ({ martyr }: { martyr: Martyr }) => {
  const [lang, setLang] = useQueryState(
    "lang",
    parseAsString.withDefault("bn"),
  );
  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <MaxWidthWrapper>
        <ProfilePage martyr={martyr} lang={lang as "bn"|"en"}/>
      </MaxWidthWrapper>
      <Footer lang={lang as "bn"|"en"} />
    </>
  );
};

const MainSection = ({ martyr }: { martyr: Martyr }) => {
  const lang = "bn"
  return (
    <Suspense
      fallback={
        <>
          <Navbar lang={lang} setLang={() => {}} />
          <MaxWidthWrapper>
            <ProfilePage martyr={martyr} lang={lang}/>
          </MaxWidthWrapper>
          <Footer lang={lang} />
        </>
      }
    >
      <SuspendMain martyr={martyr} />
    </Suspense>
  );
};

export default MainSection;
