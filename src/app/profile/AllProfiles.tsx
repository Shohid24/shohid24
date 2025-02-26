"use client";

import React, { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getTranslation, Translation } from "./components/translations";
import { parseAsString, useQueryState } from "nuqs";

const FindProfile = ({
  translation,
  totalMartyrs,
}: {
  translation: Translation;
  totalMartyrs: number;
}) => {
  const [userID, setUserID] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userID.trim()) {
      router.push(
        `/profile/${userID.trim().toLowerCase()}?lang=${translation.lang}`,
      );
    }
  };

  return (
    <div className="my-28 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {translation.findHeader}
          </CardTitle>
          <CardDescription className="mt-2 text-center">
            {translation.findDescription(totalMartyrs)}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Input
              id="find-profile"
              type="text"
              placeholder={translation.findPlaceholder}
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" variant="destructive">
              {translation.findSubmit}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

function Wrapper({ totalMartyrs }: { totalMartyrs: number }) {
  const [lang, setLang] = useQueryState(
    "lang",
    parseAsString.withDefault("bn"),
  );
  const translation = getTranslation(lang);

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <FindProfile translation={translation} totalMartyrs={totalMartyrs} />
      <Footer lang={lang as "bn" | "en"} />
    </>
  );
}

function AllProfiles({ totalMartyrs }: { totalMartyrs: number }) {
  const lang = "bn";
  useEffect(() => {
    // focus on "find-profile" input
    document.getElementById("find-profile")?.focus();
  }, []);
  return (
    <Suspense
      fallback={
        <>
          <Navbar lang={lang} setLang={() => {}} />
          <FindProfile
            translation={getTranslation(lang)}
            totalMartyrs={totalMartyrs}
          />
          <Footer lang={lang as "bn" | "en"} />
        </>
      }
    >
      <Wrapper totalMartyrs={totalMartyrs} />
    </Suspense>
  );
}

export default AllProfiles;
