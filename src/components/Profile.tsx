import Image from "next/image";
import Link from "next/link";
import { getFontClass } from "@/lib/fontLoader";
import { Calendar } from "lucide-react";
import { ProfileType } from "@/lib/types";
import { getTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";

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
      <div className="relative w-fit max-w-[150px] md:max-w-[190px]">
        {showIndex && (
          <span className="absolute left-0 top-0 h-7 min-w-8 rounded-md bg-red-500 px-1 text-xl font-black text-gray-100">
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
            "block aspect-square rounded-md object-cover max-w-[min(150px,100%)] md:max-w-[min(190px,100%)]",
            noLink ? "hover:cursor-pointer" : "mt-0",
          )}
        />
        {!noLink && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <span
              className={cn(
                "text-xl font-semibold text-white",
                getFontClass(lang),
              )}
            >
              {lang === "en" ? "Details" : "বিস্তারিত"}
            </span>
          </div>
        )}
      </div>

      <div className="flex h-full w-full flex-col gap-1 text-start">
        <p className="text-lg font-bold md:text-2xl">{name}</p>
        <p className="text-sm text-muted-foreground md:text-base">
          {profession || translation.unavailable}
        </p>
        <p className="text-sm md:text-base">
          {info || translation.unavailable}
        </p>
        <p className="mt-auto flex items-center justify-start gap-1 text-nowrap">
          <Calendar size={20} />
          {martyrDate}
        </p>
      </div>
    </>
  );

  const sharedClassName = cn(
    "grid h-full grid-cols-1 grid-rows-[auto_1fr] w-[150px] rounded-md border p-1 gap-2 mb-3 md:w-52 md:p-2 mx-0",
    !noLink && "group",
    className,
  );

  <span className="w-40"></span>;

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
