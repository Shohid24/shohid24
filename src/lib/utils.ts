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
