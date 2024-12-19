import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

const defaultClass =
  "md:rounded-2xl rounded-xl border-2 border-red-300 bg-red-50 dark:bg-opacity-95 md:px-5 md:py-4 px-1 py-3 md:text-2xl text-lg lg:text-3xl font-bold text-red-700 hover:cursor-text";

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
