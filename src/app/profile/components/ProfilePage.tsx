import Profile from "@/components/Profile";
import { Skeleton } from "@/components/ui/skeleton";
import { toBengali } from "@/lib/helpers/date";
import { getTranslation } from "@/lib/translations";
import { Martyr, MartyrInfo } from "@/lib/types";
import { cn, fetchJson } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

const ProfilePage = ({
  martyr,
  lang,
}: {
  martyr: Martyr;
  lang: "bn" | "en";
}) => {
  const id = martyr?.id;
  const [profile, setProfile] = useState<MartyrInfo>();
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      const result = await fetchJson(String(id));
      console.log(result.data);
      if (result.ok) {
        setProfile(result.data);
      } else {
        setError(result.error || "Failed to fetch profile data.");
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retry]);

  const translation = getTranslation(lang);
  const name = martyr.name[lang as "bn" | "en"];
  const profession = martyr.profession[lang as "bn" | "en"];
  const info = martyr.info[lang as "bn" | "en"];
  const date = martyr.date;
  const hasImage = martyr.hasImage;

  if (error) {
    // show alert message
    alert(error);
    setRetry(retry + 1);
  }

  return (
    <>
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
          className="flex-row border-none md:-mt-2 md:flex-col"
        />
        <div className="h-auto w-full flex-1 rounded-md border p-2 text-start text-lg font-bold md:text-xl">
          <section className="grid grid-cols-1 gap-2 md:grid-cols-[auto_auto] lg:grid-cols-[1fr_2fr_3fr]">
            <InfoBox
              label={translation.age}
              content={
                profile && (toBengali(profile.age) || translation.unavailable)
              }
            />
            <InfoBox
              label={translation.born}
              content={
                profile && (profile[lang].born || translation.unavailable)
              }
            />

            <InfoBox
              skeletons={<Skeleton className="h-6 w-36" />}
              label={translation.birthPlace}
              content={
                profile && (profile[lang].birthPlace || translation.unavailable)
              }
            />
          </section>
          <section className="my-2 flex flex-col items-center justify-center gap-2">
            <InfoBox
              className="w-full flex-col items-start"
              label={translation.howHeDied}
              content={
                profile && (profile[lang].cause.long || translation.unavailable)
              }
              skeletons={
                <>
                  <Skeleton className="mt-2 h-6 w-[56vw]" />
                  <Skeleton className="mt-2 h-6 w-[50vw]" />
                </>
              }
            />
            <InfoBox
              className="w-full flex-col items-start"
              label={translation.biography}
              content={
                profile && (profile[lang].bio || translation.unavailable)
              }
              skeletons={
                <>
                  <Skeleton className="mt-2 h-6 w-[59vw]" />
                  <Skeleton className="mt-2 h-6 w-[50vw]" />
                  <Skeleton className="mt-2 h-6 w-[33vw]" />
                </>
              }
            />
          </section>
        </div>
      </div>
      <section className="my-2 flex flex-col items-center justify-center gap-2 text-sm md:text-base lg:text-lg">
        {translation.giveUsInfo}
      </section>
    </>
  );
};

const InfoBox = ({
  label,
  content,
  className,
  skeletons = <Skeleton className="h-6 w-20 md:w-28" />,
}: {
  label: string;
  content: ReactNode | string;
  className?: string;
  skeletons?: ReactNode | string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-start rounded-md bg-muted p-3",
        className,
      )}
    >
      <span className="text-nowrap text-base md:text-lg lg:text-xl">
        {label}
      </span>
      <span className="ml-1 text-sm font-normal md:text-base lg:text-lg">
        {content || skeletons}
      </span>
    </div>
  );
};

export default ProfilePage;
