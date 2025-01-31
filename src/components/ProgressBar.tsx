// components/ProgressBar.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    
    // Delay stopping to ensure smooth animation
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100); 

    return () => {
      clearTimeout(timer); // Prevent memory leaks
    };
  }, [pathname, searchParams]);

  return null;
};

export default ProgressBar;
