import Image from "next/image";
import Link from "next/link";
import { getFontClass } from "@/lib/fontLoader";
import { Calendar } from "lucide-react";
import { ProfileType } from "@/lib/types";
import { getTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { toBengali } from "@/lib/helpers/date";

interface ProfileWithClassName extends ProfileType {
  className?: string;
  noLink?: boolean;
}

const Profile = ({
  id,
  name,
  profession,
  info,
  martyrDate,
  imageUrl = "",
  index = 0,
  lang = "bn",
  showIndex = true,
  className,
  noLink,
}: ProfileWithClassName) => {
  const translation = getTranslation(lang);

  const content = (
    <>
      <div className="relative h-24 w-24 md:h-auto md:w-full">
        {showIndex && (
          <span className="absolute left-0 top-0 h-6 min-w-6 rounded-md bg-red-500 px-1 text-lg font-black text-gray-100 md:h-7 md:min-w-8 md:text-xl">
            {index + 1}
          </span>
        )}
        <Image
          priority
          src={imageUrl || ""}
          alt={name || "Unknown"}
          key={imageUrl + id}
          width={208}
          height={208}
          className={cn(
            "aspect-square w-full rounded-md object-cover",
            !noLink && "hover:cursor-pointer",
          )}
        />
        {!noLink && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <span
              className={cn(
                "text-base font-semibold text-white md:text-xl",
                getFontClass(lang),
              )}
            >
              {lang === "en" ? "Details" : "বিস্তারিত"}
            </span>
          </div>
        )}
      </div>

      <div className="flex h-full w-full flex-col gap-1 px-2 text-start md:px-0">
        <p className="text-lg font-bold md:text-2xl">{name}</p>
        <p className="text-sm text-muted-foreground md:text-base">
          {profession || translation.unavailable}
        </p>
        <p className="text-sm md:text-base">
          {info || translation.unavailable}
        </p>
        <p className="mt-auto flex items-center justify-start gap-1 text-nowrap">
          <Calendar size={20} />
          {lang == "en" ? martyrDate : toBengali(martyrDate)}
        </p>
      </div>
    </>
  );

  const sharedClassName = cn(
    "grid h-full rounded-md border p-1 md:p-2",
    // Base styles that work for both layouts
    "w-full grid-cols-[auto_1fr] grid-rows-1 gap-2",
    // Default column layout styles
    "md:w-52 md:grid-cols-1 md:grid-rows-[auto_1fr]",
    !noLink && "group",
    className,
  );

  if (noLink) {
    return <div className={sharedClassName}>{content}</div>;
  }

  return (
    <Link href={`/profile/${id}?lang=${lang}`} className={sharedClassName}>
      {content}
    </Link>
  );
};

export default Profile;
