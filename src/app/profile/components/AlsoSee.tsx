import Image from "next/image";
import Link from "next/link";
import type { Martyr } from "@/lib/types";
import { Calendar } from "lucide-react";
import { formatDate, toBengali } from "@/lib/helpers/date";
import { getLangPath } from "@/lib/utils/language";

function ShortProfile({ martyr, lang }: { martyr: Martyr; lang: "bn" | "en" }) {
  return (
    <Link
      href={getLangPath(`/profile/${martyr.id}`, lang)}
      className="flex-1 rounded-lg border p-2.5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <Image
          src={
            martyr.hasImage ? `/compressed/${martyr.id}.jpg` : "/default.jpg"
          }
          alt={martyr[lang].name}
          width={80}
          height={80}
          className="aspect-square rounded-full object-cover"
        />

        <div
          className="flex-grow text-start"
          itemScope
          itemType="https://schema.org/Person"
        >
          <h3 className="text-lg font-semibold" itemProp="Name">
            {martyr[lang].name}
          </h3>
          <p className="text-sm text-muted-foreground" itemProp="Profession">
            {martyr[lang].profession}
          </p>
          <p className="mt-1 text-sm" itemProp="Institution">
            {martyr[lang].info}
          </p>
          <p
            className="mt-auto flex items-center justify-start gap-1 text-nowrap"
            itemProp="MartyrDate"
          >
            <Calendar size={18} className="-mt-[1px]" />
            {lang == "bn"
              ? toBengali(formatDate(martyr.date))
              : formatDate(martyr.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}

const AlsoSee = ({
  seeAlso,
  lang,
}: {
  seeAlso: [Martyr, Martyr];
  lang: "en" | "bn";
}) => {
  return (
    <div className="my-8">
      <h2 className="lg:3xl mb-4 text-xl font-semibold md:text-2xl">
        {lang === "en"
          ? "Also read about these martyrs"
          : "এই শহীদদের সম্পর্কেও পড়ুন"}
      </h2>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {seeAlso.map((martyr) => (
          <ShortProfile martyr={martyr} lang={lang} key={martyr.id} />
        ))}
      </div>
    </div>
  );
};

export default AlsoSee;
