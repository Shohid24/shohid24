import Link from "next/link";
import MaxWidthWrapper from "./ui/MaxwidthWrapper";
import { Inter } from "next/font/google";

const interFont = Inter({ subsets: ["latin"] });

const Footer = ({ lang }: { lang: string }) => {
  return (
    <MaxWidthWrapper className={`my-10 border-t ${interFont.className}`}>
      <p className="pt-6 text-center text-lg font-bold text-primary md:text-xl">
        &copy; {new Date().getFullYear()} Shohid24. All rights reserved.
      </p>
      <p className="font-mono font-semibold tracking-tighter text-primary/70">
        Maintained by{" "}
        <Link
          href="https://nusab19.pages.dev"
          className="underline decoration-sky-600 underline-offset-2 transition-all duration-150 hover:text-primary"
          target="_blank"
        >
          Nusab Taha
        </Link>
      </p>
    </MaxWidthWrapper>
  );
};

export default Footer;
