import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
  id,
}: {
  className?: string;
  children?: ReactNode;
  id?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-2.5 text-center md:px-10 lg:px-20",
        className,
      )}
      id={id}
    >
      {children || ""}
    </div>
  );
};

export default MaxWidthWrapper;
