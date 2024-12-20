import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const Anchor = ({
  children,
  className,
  raw = false,
  href,
  target,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  raw?: boolean;
  href: string;
  target?: string;
  title?: string;
}) => {
  if (raw) {
    return (
      <Button asChild variant="link">
        <a
          href={href}
          target={target}
          title={title}
          className={cn("mx-1 px-0", className)}
        >
          {children}
        </a>
      </Button>
    );
  }
  return (
    <Button asChild variant="link">
      <Link
        href={href}
        target={target}
        title={title}
        className={cn(
          "mx-1 px-0 underline decoration-primary underline-offset-2 transition-all duration-100 hover:decoration-blue-500 focus:text-blue-500 dark:focus:text-blue-300 lg:px-1",
          className,
        )}
      >
        {children}
      </Link>
    </Button>
  );
};

export default Anchor;
