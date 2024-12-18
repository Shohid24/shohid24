import Link from "next/link";
import MaxWidthWrapper from "./ui/MaxwidthWrapper";

const Footer = () => {
  return (
    <MaxWidthWrapper className="my-10 border-t">
      <p className="pt-6 text-center text-xl font-bold text-primary">
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
