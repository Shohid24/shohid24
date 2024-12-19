"use client";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  perPage,
  totalItems,
  setCurrentPage,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const totalPages = Math.ceil(totalItems / perPage);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useHotkeys(
    "rightarrow",
    () => {
      if (currentPage === totalPages) {
        return;
      }
      setCurrentPage(currentPage + 1);
    },
    [currentPage, totalPages],
  );
  useHotkeys(
    "leftarrow",
    () => {
      if (currentPage === 1) {
        return;
      }
      setCurrentPage(currentPage - 1);
    },
    [currentPage, totalPages],
  );

  const getVisiblePages = () => {
    // For mobile, show fewer pages
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (isMobile) {
      // Simplified view for mobile
      if (currentPage <= 2) {
        pages.push(1, 2, totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, totalPages - 1, totalPages);
      } else {
        pages.push(1, currentPage, totalPages);
      }
    } else {
      // Desktop view
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="my-2 flex items-center justify-center gap-2 md:my-6">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-20 select-none px-2 sm:min-w-[3rem] sm:px-3"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
          </TooltipTrigger>
          <TooltipContent className="hidden bg-primary/85 md:block">
            <kbd>Ctrl+&lt;</kbd>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-1">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <div
              key={`dots-${index}`}
              className="w-5 font-bold text-muted-foreground"
            >
              &#8230;
            </div>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              className="h-8 w-8 px-0 md:w-12"
            >
              {page}
            </Button>
          ),
        )}
      </div>

      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-20 select-none px-2 sm:min-w-[3rem] sm:px-3"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="hidden bg-primary/85 md:block">
            <kbd>Ctrl+&gt;</kbd>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
};

export default Pagination;
