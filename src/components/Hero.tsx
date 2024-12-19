import Link from "next/link";
import { totalMartyrs } from "@/lib/helpers/search";
import { DateConverter } from "@/lib/helpers/date";
import CoolButton from "./ui/CoolButton";

const Hero = ({ lang }: { lang: string }) => {
  return (
    <div className="my-2 flex flex-col items-center justify-center gap-2 px-3 text-start md:my-4 md:flex-row md:justify-between md:gap-0">
      <div className="flex items-center justify-start gap-1 md:gap-1.5 lg:gap-5">
        <CoolButton className="">
          শহীদদের সংখ্যা <span className="text-red-600">১২০০+</span>
        </CoolButton>
        <CoolButton className="border-sky-300 bg-sky-50 text-sky-700">
          লিস্টে আছে{" "}
          <span className="font-bold text-sky-600">
            {lang == "en"
              ? totalMartyrs
              : DateConverter.toBengali(String(totalMartyrs))}
          </span>{" "}
          জন
        </CoolButton>
      </div>
      <Link
        href="https://forms.gle/efEVqZEHHR4fZuyG7"
        className="rounded-full bg-red-600 p-3 text-lg font-bold text-gray-100 transition-colors duration-100 hover:bg-red-700 md:p-4 md:text-2xl lg:text-3xl underline underline-offset-4 decoration-red-300"
        target="_blank"
      >
        শহীদদের তথ্য দিন
      </Link>
    </div>
  );
};

export default Hero;
