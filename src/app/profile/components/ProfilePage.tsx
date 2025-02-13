import Balancer from "react-wrap-balancer";

import Profile from "@/components/Profile";
import { formatDate, toBengali } from "@/lib/helpers/date";
import { getTranslation } from "./translations";
import { cn, guid } from "@/lib/utils";
import { ReactNode } from "react";
import { IUser } from "@/server/schema/user";
import { Button } from "@/components/ui/button";
import { BadgeCheck, BadgeX, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ProfilePage = ({
  martyr,
  lang,
}: {
  martyr: IUser;
  lang: "bn" | "en";
}) => {
  const id = martyr?.id;
  const verified = martyr.verified;
  const show = martyr.show;
  const translation = getTranslation(lang);
  const name = martyr[lang].name;
  const profession = martyr[lang].profession;
  const info = martyr[lang].info;
  const date = martyr.date;
  const imageUrl = martyr.image;

  return (
    <>
      <title>{translation.generateTitle(name)}</title>
      {!show && (
        <div className="animate-drop-in mt-2 flex w-full items-center gap-4 rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-950/5 to-red-900/10 px-4 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-red-500/10">
          <div className="rounded-full bg-red-500/10 p-2">
            <EyeOff className="h-5 w-5 text-red-500" />
          </div>
          <span className="font-medium tracking-wide text-red-900">
            {translation.hidden}
          </span>
        </div>
      )}
      <div className="my-5 flex flex-col items-center justify-between gap-2 md:flex-row md:items-stretch">
        <Profile
          noLink
          header
          id={String(id)}
          name={name}
          profession={profession}
          info={info}
          martyrDate={formatDate(date)}
          imageUrl={imageUrl}
          lang={lang}
          showIndex={false}
          className="max-h-52 w-full grid-cols-[auto_2fr] border-none md:-mt-2 md:grid-cols-1"
        />
        <div className="h-auto w-full flex-1 rounded-md border p-2 text-start text-lg font-bold md:text-xl">
          <div className="mb-1.5 flex items-center justify-center gap-2 text-center text-sm tracking-wider text-primary/80">
            {verified ? (
              <>
                {translation.verified}
                <BadgeCheck size={16} className="text-blue-500" />
              </>
            ) : (
              <>
                {translation.notVerified}
                <BadgeX size={16} className="text-red-500" />
              </>
            )}
          </div>
          <Separator className="mb-2" />
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
  return (
    <div
      className={cn(
        "flex items-center justify-start rounded-md bg-muted/70 p-3",
        className,
      )}
    >
      <span className="text-nowrap text-base tracking-wide md:text-lg lg:text-xl">
        {label}
      </span>
      <Balancer
        key={guid()} // for some reason, crypto.randomUUID() doesn't work in mobile
        className="ml-1 whitespace-pre-line text-sm font-normal animate-in fade-in-50 md:text-base"
      >
        {content || getTranslation(lang).unavailable}
      </Balancer>
    </div>
  );
};

export default ProfilePage;
