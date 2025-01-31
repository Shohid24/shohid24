import Balancer from "react-wrap-balancer";

import Profile from "@/components/Profile";
import { Skeleton } from "@/components/ui/skeleton";
import { toBengali } from "@/lib/helpers/date";
import { getTranslation } from "./translations";
import { MartyrInfo } from "@/lib/types";
import { cn, fetchJson, guid } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { IUser } from "@/server/schema/user";

const ProfilePage = ({
  martyr,
  lang,
}: {
  martyr: IUser;
  lang: "bn" | "en";
}) => {
  const id = martyr?.id;

  const translation = getTranslation(lang);
  const name = martyr[lang].name;
  const profession = martyr[lang].profession;
  const info = martyr[lang].info;
  const date = martyr.date;
  const hasImage = martyr.hasImage;

  return (
    <>
      <title>{translation.generateTitle(name)}</title>
      <div className="my-5 flex flex-col items-center justify-between gap-2 md:flex-row md:items-stretch">
        <Profile
          noLink
          id={String(id)}
          name={name}
          profession={profession}
          info={info}
          martyrDate={date}
          imageUrl={hasImage ? `/photos/${id}.jpg` : "/default.jpg"}
          lang={lang}
          showIndex={false}
          className="max-h-52 w-full grid-cols-[auto_2fr] border-none md:-mt-2 md:grid-cols-1"
        />
        <div className="h-auto w-full flex-1 rounded-md border p-2 text-start text-lg font-bold md:text-xl">
          <section className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_3fr]">
            <InfoBox
              lang={lang}
              label={translation.age}
              content={lang == "bn" ? toBengali(martyr.age) : martyr.age}
            />
            <InfoBox
              lang={lang}
              label={translation.born}
              content={
                translation.lang == "en" ? martyr.dob : toBengali(martyr.dob)
              }
            />

            <InfoBox
              lang={lang}
              className="md:col-span-2 lg:col-span-1"
              label={translation.birthPlace}
              content={martyr[lang].birthPlace}
            />
          </section>
          <section className="my-2 flex flex-col items-center justify-center gap-2">
            <InfoBox
              lang={lang}
              className="w-full flex-col items-start"
              label={translation.howHeDied}
              content={martyr[lang].cause}
            />
            <InfoBox
              lang={lang}
              className="w-full flex-col items-start"
              label={translation.biography}
              content={martyr[lang].bio}
            />
          </section>
        </div>
      </div>
      <section className="mx-auto my-2 flex max-w-screen-md flex-col items-center justify-center gap-2 text-balance text-sm md:text-base lg:text-lg">
        {translation.giveUsInfo}
      </section>
    </>
  );
};

const InfoBox = ({
  label,
  content,
  className,
  lang = "en",
}: {
  label: string;
  content: ReactNode | string;
  className?: string;
  lang?: "en" | "bn";
}) => {
  console.log(content);
  return (
    <div
      className={cn(
        "flex items-center justify-start rounded-md bg-muted p-3",
        className,
      )}
    >
      <span className="text-nowrap text-base tracking-wide md:text-lg lg:text-xl">
        {label}
      </span>
      <Balancer
        key={guid()} // fsr, crypto.randomUUID() doesn't work in mobile
        className="ml-1 whitespace-pre-line text-sm font-normal animate-in fade-in-50 md:text-base"
      >
        {content || getTranslation(lang).unavailable}
      </Balancer>
    </div>
  );
};

export default ProfilePage;
