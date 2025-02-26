import createFuzzySearch from "@nozbe/microfuzz";
import { Martyr, SearchResults } from "../types";

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
    strategy: "smart",
  });

  return (query: string): SearchResults => {
    return fuzzySearch(query);
  };
}
