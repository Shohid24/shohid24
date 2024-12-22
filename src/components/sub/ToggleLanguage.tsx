import { getFontClass } from "@/lib/fontLoader";
import { cn } from "@/lib/utils";

const ToggleLanguage = ({
  lang,
  setLang,
}: {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const bnFont = getFontClass("bn");

  return (
    <div className={`relative h-9 min-w-fit rounded-md border p-1 ${bnFont}`}>
      <span
        className={cn(
          "absolute top-[1.5px] -z-10 h-8 w-12 rounded-md bg-red-600 transition-all duration-150",
          lang === "en" ? "left-[52.5px] px-[25px]" : "left-[3px]",
        )}
      />
      <div className="mt-[1px]">
        <button
          className={cn(
            "mr-1 w-11 transition-colors duration-150",
            lang === "bn" && "text-white",
          )}
          onClick={() => setLang("bn")}
        >
          বাংলা
        </button>
        <button
          className={cn(
            "ml-1 w-11 transition-colors duration-150",
            lang === "en" && "text-white",
          )}
          onClick={() => setLang("en")}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default ToggleLanguage;
