import { useState, useRef, useEffect, Suspense, useTransition } from "react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { createPersonSearch } from "@/lib/helpers/search";
import { toBengali } from "@/lib/helpers/date";
import { Input } from "./ui/input";
import List from "@/components/List";
import type { Translation } from "@/components/translations";
import type { Martyr, SearchResults } from "@/lib/types";
import MountKeyboardShortcuts from "./sub/MountKeyboardShortcuts";

function ShowMartyrCount({
  isEnglish,
  totalMartyrs,
}: {
  isEnglish: boolean;
  totalMartyrs: number;
}) {
  const languageData = {
    en: {
      prefix: "Our list currently has ",
      suffix: " martyrs",
    },
    bn: {
      prefix: "আমাদের তালিকায় বর্তমানে ",
      suffix: " জন শহীদ রয়েছেন",
    },
  };

  const lang = isEnglish ? "en" : "bn";
  const { prefix, suffix } = languageData[lang];
  const count = isEnglish ? totalMartyrs : toBengali(totalMartyrs);

  return (
    <p className="mb-2.5 font-bold tracking-wide md:text-lg">
      {prefix}
      <span className="inline-block w-8 font-bold text-red-700 dark:text-red-500">
        {count}
      </span>
      {suffix}
    </p>
  );
}

// Component to show search statistics
const SearchStats = ({
  translation,
  searchResult,
  isSearching,
  query,
  totalMartyrs,
}: {
  translation: Translation;
  searchResult: SearchResults;
  isSearching: boolean;
  query: string;
  totalMartyrs: number;
}) => {
  const isEnglish = translation.lang === "en";

  // Show total stats when no query
  if (query.length === 0) {
    return (
      <ShowMartyrCount isEnglish={isEnglish} totalMartyrs={totalMartyrs} />
    );
  }

  // Show search status or results
  if (isSearching) {
    return (
      <p className="mb-2 tracking-wide md:text-lg">
        {isEnglish ? "Searching..." : "খোঁজা হচ্ছে..."}
      </p>
    );
  }

  return (
    <p className="mb-2 tracking-wide md:text-lg">
      {isEnglish ? (
        <>
          Found{" "}
          <span className="inline-block w-8 font-bold text-red-700 dark:text-red-500">
            {searchResult.length}
          </span>{" "}
          matching {searchResult.length === 1 ? "person" : "people"}
        </>
      ) : (
        <>
          <span className="inline-block w-8 font-bold text-red-700 dark:text-red-500">
            {toBengali(searchResult.length)}
          </span>{" "}
          জন এর রেজাল্ট দেখানো হচ্ছে
        </>
      )}
    </p>
  );
};

// Main component with search functionality
const HomepageContent = ({
  translation,
  data,
}: {
  translation: Translation;
  data: Martyr[];
}) => {
  // Create search function only once
  const searchPerson = useRef(createPersonSearch(data)).current;

  // State for managing search and UI
  const [isSearching, startTransition] = useTransition();
  const [searchResult, setSearchResult] = useState<SearchResults>([]);
  const totalMartyrs = data.length;

  // URL query params
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault(""),
  );
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );

  // Refs
  const queryRef = useRef<HTMLInputElement | null>(null);
  const prevQueryRef = useRef(query);

  // Handle search with useTransition
  useEffect(() => {
    // Skip search if query is empty
    if (query === "") {
      setSearchResult([]);
      return;
    }

    // Use transition to keep UI responsive during search
    startTransition(() => {
      const results = searchPerson(query);
      setSearchResult(results);
    });

    // Reset page only if query changed
    if (prevQueryRef.current !== query) {
      setCurrentPage(1);
      prevQueryRef.current = query;
    }
  }, [query, searchPerson, setCurrentPage]);

  // Handle query change
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Keyboard shortcuts
  MountKeyboardShortcuts(queryRef);

  return (
    <main>
      <div className="m-3 flex flex-col items-center justify-between gap-2 border-b py-2 text-start md:flex-row">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          {translation.header}
        </h1>
        <Input
          ref={queryRef}
          className={`w-full md:max-w-72 ${translation.lang === "en" && "tracking-tighter"}`}
          placeholder={translation.searchPlaceholder}
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <SearchStats
        translation={translation}
        searchResult={searchResult}
        isSearching={isSearching}
        query={query}
        totalMartyrs={totalMartyrs}
      />

      <List
        martyrs={data}
        searchResult={searchResult}
        lang={translation.lang}
        query={query}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

// Main homepage component with suspense
const Homepage = ({
  translation,
  data,
}: {
  translation: Translation;
  data: Martyr[];
}) => {
  return (
    <Suspense
      fallback={<HomepageContent translation={translation} data={data} />}
    >
      <HomepageContent translation={translation} data={data} />
    </Suspense>
  );
};

export default Homepage;
