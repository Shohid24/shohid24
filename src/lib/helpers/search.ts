import createFuzzySearch from "@nozbe/microfuzz";
import searchableData from "./../../../public/data/searchableData.json"; // Preloaded data
import { SearchResults } from "../types";

const fuzzySearch = createFuzzySearch(searchableData, {
  getText: (item) => [
    item.name.bn,
    item.name.en,
    item.profession.bn,
    item.profession.en,
    item.info.bn,
    item.info.en,
    item.date,
  ],
  strategy: "smart",
});

export function SearchPerson(query: string): SearchResults {
  const result = fuzzySearch(query);
  return result;
}

export const MartyrList = searchableData;
