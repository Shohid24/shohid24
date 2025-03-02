import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchJson(id: string) {
  try {
    const response = await fetch(`/data/profiles/${id}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching for fresh data in client components
    });

    if (!response.ok) {
      console.error(`Error fetching martyr: ${response.status}`);
      return { ok: false };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser.
 * @link http://slavik.meltser.info/?p=142
 */
export function guid(): string {
  function _p8(s?: boolean): string {
    const p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

export function removeExtraLines(text: string): string {
  return text.replace(/\n{3,}/g, "\n\n");
}

export function sliceTextResponsive(text: string, screenWidth: number): string {
  let length = 40;

  if (screenWidth < 640) {
    // sm breakpoint
    length = 40;
  } else if (screenWidth < 768) {
    // md breakpoint
    length = 80;
  } else if (screenWidth < 1024) {
    // lg breakpoint
    length = 55;
  } else if (screenWidth < 1280) {
    // xl breakpoint
    length = 100;
  } else if (screenWidth < 1920) {
    // xxl breakpoint
    length = 123;
  }

  return text.length > length ? text.slice(0, length) + "..." : text;
}
