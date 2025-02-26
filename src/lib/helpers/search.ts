import createFuzzySearch from "@nozbe/microfuzz";
import { Martyr, SearchResults } from "@/lib/types";

export function createPersonSearch(data: Martyr[]) {
  const fuzzySearch = createFuzzySearch(data, {
    getText: (item: Martyr) => [
      item.bn.name,
      item.en.name,
      item.bn.profession,
      item.en.profession,
      item.bn.info,
      item.en.info,
      item.date,
    ],
    strategy: "smart", // off, smart (default), aggressive
  });

  return (query: string): SearchResults => {
    return fuzzySearch(query);
  };
}
