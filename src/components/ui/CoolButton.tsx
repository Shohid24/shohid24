import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

const defaultClass =
  "md:rounded-2xl rounded-xl border-2 border-red-300 bg-red-50 dark:bg-opacity-95 md:px-3 md:py-2 px-1 py-3 md:text-xl text-lg lg:text-2xl font-semibold text-red-700 hover:cursor-text";

interface CoolButtonProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

const CoolButton: React.FC<CoolButtonProps> = ({
  children,
  className,
  asChild = false,
}) => {
  const Comp = asChild ? Slot : "p";

  return <Comp className={cn(defaultClass, className)}>{children}</Comp>;
};

export default CoolButton;
