import Link from "next/link";
import CoolButton from "./ui/CoolButton";

import type { Translation } from "@/lib/translations";

const Hero = ({ translation }: { translation: Translation }) => {
  return (
    <div className="my-2 flex flex-col items-center justify-center gap-2 px-3 text-start md:my-4 md:flex-row md:justify-between md:gap-0">
      <div className="flex items-center justify-start gap-2 md:gap-1.5 lg:gap-5">
        <CoolButton className={translation.lang == "en" ? "text-base" : ""}>
          {translation.martyrEstimate}
        </CoolButton>
        <CoolButton
          className={`border-sky-300 bg-sky-50 text-sky-700 ${translation.lang == "en" && "text-base"}`}
        >
          {translation.listedMartyrs}
        </CoolButton>
      </div>
      <Link
        href="https://forms.gle/efEVqZEHHR4fZuyG7"
        className="rounded-full bg-red-600 p-3 text-lg font-bold text-gray-100 underline decoration-red-300 underline-offset-4 transition-colors duration-100 hover:bg-red-700 md:p-4 md:text-2xl lg:text-3xl"
        target="_blank"
      >
        {translation.submitButton}
      </Link>
    </div>
  );
};

export default Hero;
