import MaxWidthWrapper from "./ui/MaxwidthWrapper";
import { Inter } from "next/font/google";
import type { Translation } from "@/lib/translations";

const interFont = Inter({ subsets: ["latin"] });

const Footer = ({ translation }: { translation: Translation }) => {
  return (
    <MaxWidthWrapper className={`my-10 border-t ${interFont.className}`}>
      <p className="pt-6 text-center text-lg font-bold text-primary md:text-xl">
        {translation.footerText}
      </p>
      <p className="font-mono font-semibold tracking-tighter text-primary/70">
        {translation.maintainerText}
      </p>
    </MaxWidthWrapper>
  );
};

export default Footer;
