import { cn } from "@/lib/utils";
import { Rows, ScrollText } from "lucide-react";
import React from "react";

const ViewAsButton = ({
  viewAs,
  setViewAs,
  className,
}: {
  viewAs: string;
  setViewAs: (value: string) => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "inline-flex rounded-full bg-muted px-1.5 py-1 shadow-lg transition-shadow duration-200 hover:shadow-xl",
        className,
      )}
    >
      <div className="relative flex items-center">
        <button
          onClick={() => setViewAs("all")}
          className={`relative z-10 rounded-full p-1.5 transition-all duration-300 md:p-2 ${
            viewAs == "all"
              ? "text-white"
              : "text-muted-foreground hover:text-muted-foreground/80"
          }`}
          aria-label="Show with pagination"
        >
          <Rows size={16} />
        </button>
        <button
          onClick={() => setViewAs("page")}
          className={`relative z-10 rounded-full p-1.5 transition-all duration-300 md:p-2 ${
            viewAs == "page"
              ? "text-white"
              : "text-muted-foreground hover:text-muted-foreground/80"
          }`}
          aria-label="Show all items"
        >
          <ScrollText size={16} />
        </button>
        <div
          className={`absolute inset-0 h-full w-1/2 rounded-full bg-rose-500 shadow-sm transition-all duration-300 ${
            viewAs == "page" ? "translate-x-full" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ViewAsButton;
