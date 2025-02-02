import MaxWidthWrapper from "./ui/MaxwidthWrapper";
import { getTranslation, type Translation } from "@/components/translations";
import { getFontClass } from "@/lib/fontLoader";
import { cn } from "@/lib/utils";

const lastUpdatedDate = new Date().toISOString().split(":")[0] + ":00:00.000Z";

const LastUpdated = () => {
  const formattedDate = new Date(lastUpdatedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <p className="pt-8 text-xs font-semibold">
      <span className="mr-1.5 tracking-wider">Last updated:</span>
      <span className="font-mono tracking-tighter">
        <time dateTime={lastUpdatedDate}>{formattedDate}</time>
      </span>
    </p>
  );
};

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
      <LastUpdated />
    </MaxWidthWrapper>
  );
};

export default Footer;
