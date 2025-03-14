import { ReactNode, useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import Profile from "@/components/Profile";

import { Separator } from "@/components/ui/separator";
import { BadgeCheck, BadgeX, EyeOff } from "lucide-react";
import { IUser } from "@/server/schema/user";
import { getTranslation } from "./translations";
import { formatDate, toBengali } from "@/lib/helpers/date";
import { cn, guid, removeExtraLines, sliceTextResponsive } from "@/lib/utils";
import RelativeTime from "@/components/sub/RelativeTime";
import Share from "@/components/sub/Share";
import AlsoSee from "./AlsoSee";
import { Martyr } from "@/lib/types";
import { HOSTED_URL } from "@/lib/constants";

const ProfilePage = ({
  martyr,
  lang,
  seeAlso,
}: {
  martyr: IUser;
  lang: "bn" | "en";
  seeAlso: [Martyr, Martyr];
}) => {
  const id = martyr?.id;
  const verified = martyr.verified;
  const show = martyr.show;
  const sources = martyr.sources;
  const translation = getTranslation(lang);
  const name = martyr[lang].name;
  const profession = martyr[lang].profession;
  const info = martyr[lang].info;
  const date = martyr.date;
  const lastUpdatedString = String(martyr.lastUpdated);
  const imageUrl = martyr.image.includes("default.jpg")
    ? "/default.jpg"
    : `/photos/${id}.jpg`;

  const engShareText = `\
Read about ${name}, who was martyred on ${date} during the July 2024 Revolution of Bangladesh.

#Shohid24 #Bangladesh


`;
  const bnShareText = `\
${name}, ${toBengali(date)} তারিখে ২০২৪ এর জুলাই বিপ্লবে শহীদ হন। তাঁর সম্পর্কে বিস্তারিত পড়ুন।

#Shohid24 #Bangladesh


`;

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const checkWidthChange = () => setScreenWidth(window.innerWidth);
    checkWidthChange();
    window.addEventListener("resize", checkWidthChange);
    return () => window.removeEventListener("resize", checkWidthChange);
  }, []);

  return (
    <>
      <title>{translation.generateTitle(name)}</title>
      {!show && (
        <div className="mt-2 flex w-full animate-drop-in items-center gap-4 rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-950/5 to-red-900/10 px-4 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-red-500/10">
          <div className="rounded-full bg-red-500/10 p-2">
            <EyeOff className="h-5 w-5 text-red-500" />
          </div>
          <span className="font-medium tracking-wide text-red-900">
            {translation.hidden}
          </span>
        </div>
      )}
      <div className="my-5 flex flex-col items-center justify-between gap-2 md:flex-row md:items-stretch">
        <div className="mb-3 flex w-full flex-col items-center md:mb-0 md:w-fit">
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
            show={false}
            className="max-h-96 w-full grid-cols-[auto_2fr] border-none md:-mt-2 md:grid-cols-1"
          />
          <Separator className="-mt-3 mb-1 md:mt-0" />
          <Share
            url={
              `${HOSTED_URL}/profile/${id}` + (lang == "en" ? "?lang=en" : "")
            }
            title={lang == "bn" ? bnShareText : engShareText}
          />
        </div>

        <div className="flex h-auto w-full flex-1 flex-col rounded-md border p-2 text-start text-lg font-bold md:text-xl">
          <div className="mb-1.5 flex items-center justify-center gap-2 text-center text-sm tracking-wider text-primary/80">
            {verified ? (
              <>
                {translation.verified}
                <BadgeCheck size={16} className="text-green-500" />
              </>
            ) : (
              <>
                {translation.notVerified}
                <BadgeX size={16} className="text-red-500" />
              </>
            )}
          </div>
          <Separator className="mx-auto mb-2 w-56" />
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
              content={removeExtraLines(martyr[lang].cause)}
            />
            <InfoBox
              lang={lang}
              className="w-full flex-col items-start"
              label={translation.biography}
              content={removeExtraLines(martyr[lang].bio)}
            />
            {sources.length > 0 && (
              <div className="w-full rounded-md bg-muted/70 p-3">
                <h2>{translation.sources}</h2>
                <div>
                  {sources.map((source, i) => (
                    <span key={i} className="ml-1 block text-xs md:text-sm">
                      {i + 1}.{" "}
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 tracking-wider text-blue-600"
                      >
                        {sliceTextResponsive(source, screenWidth)}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
          <RelativeTime
            utcTime={lastUpdatedString}
            lang={lang}
            className="mt-auto"
          />
        </div>
      </div>
      <div className="mx-auto my-2 flex max-w-screen-md flex-col items-center justify-center gap-2 text-balance text-sm md:text-base">
        {translation.giveUsInfo(martyr[lang].name, martyr.id)}
      </div>
      <section className="mx-auto max-w-screen-md items-end">
        <AlsoSee seeAlso={seeAlso} lang={lang} />
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
