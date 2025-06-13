import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Translation } from "@/components/translations";
import Link from "next/link";
import { GITHUB_LINK } from "@/lib/constants";
import Anchor from "./ui/Anchor";
import { Separator } from "./ui/separator";
import { getLangPath } from "@/lib/utils/language";

const SidePanel = ({
  className,
  translation,
}: {
  className?: string;
  translation: Translation;
}) => {
  const lang = translation.lang;
  return (
    <Sheet>
      <SheetTrigger className={className} title="Open Menu">
        <Button variant="outline" size="icon" className="p-2" asChild>
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[80vw] max-w-[256px]">
        <SheetHeader>
          <SheetTitle className="-mt-3.5 text-2xl">
            {translation.logoName}
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
          <Anchor href={getLangPath("/about", lang)}>
            {translation.aboutName}
          </Anchor>
          <Anchor href={getLangPath("/contact", lang)}>
            {translation.contactName}
          </Anchor>
          <Link
            href={GITHUB_LINK}
            target="_blank"
            className="my-14 flex items-center justify-center gap-1 rounded-full bg-muted px-2 py-1 font-semibold underline underline-offset-2"
          >
            <svg
              className="h-5 w-5 fill-[#181717] dark:fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>{" "}
            Github
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidePanel;
