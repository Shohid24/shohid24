import Link from "next/link";
import { totalMartyrs } from "@/lib/helpers/search";
import { DateConverter } from "@/lib/helpers/date";
import CoolButton from "./ui/CoolButton";

const Hero = ({ lang }: { lang: string }) => {
  return (
    <div className="my-2 flex flex-col items-center justify-center gap-2 px-3 text-start md:my-4 md:flex-row md:justify-between">
      <div className="flex items-center justify-start md:gap-3 lg:gap-5">
        <CoolButton className="">
          শহীদদের সংখ্যা <span className="text-red-600">১২০০+</span>
        </CoolButton>
        <CoolButton className="border-sky-300 bg-sky-100 text-sky-600">
          লিস্টে আছে{" "}
          <span className="font-bold text-sky-500">
            {lang == "en"
              ? totalMartyrs
              : DateConverter.toBengali(String(totalMartyrs))}
          </span>
        </CoolButton>
      </div>
      <Link
        href="https://forms.gle/efEVqZEHHR4fZuyG7"
        className="rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-100 p-3 text-lg font-bold text-gray-100 md:p-4 md:text-2xl lg:text-3xl"
        target="_blank"
      >
        শহীদদের তথ্য দিন
      </Link>
    </div>
  );
};

export default Hero;
