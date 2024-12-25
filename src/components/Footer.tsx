import MaxWidthWrapper from "./ui/MaxwidthWrapper";
import { getTranslation, type Translation } from "@/components/translations";
import { getFontClass } from "@/lib/fontLoader";
import { cn } from "@/lib/utils";

const Footer = ({ lang }: { lang: "bn" | "en" }) => {
  const translation = getTranslation(lang);
  return (
    <MaxWidthWrapper
      className={`my-10 border-t ${getFontClass(translation.lang)}`}
    >
      <p className="pt-6 text-center text-lg font-bold text-primary md:text-xl">
        {translation.footerText}
      </p>
      <p
        className={cn(
          "mt-3 text-xs font-semibold tracking-wider text-primary/70 md:text-sm",
          translation.lang == "en" && "font-mono tracking-tighter",
        )}
      >
        {translation.maintainerText}
      </p>
    </MaxWidthWrapper>
  );
};

export default Footer;
