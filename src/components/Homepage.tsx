import { useState, useRef, useEffect, Suspense } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SearchPerson, SearchResults } from "@/lib/helpers/search";
import List from "./List";
import { Input } from "./ui/input";
import { parseAsString, useQueryState } from "nuqs";
import type { Translation } from "@/lib/translations";

const Homepage_Sus = ({ translation }: { translation: Translation }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({
      // throttleMs: isDesktop ? 100 : 20000,
    }),
  );
  const queryRef = useRef<HTMLInputElement | null>(null);

  const [searchResult, setSearchResult] = useState<SearchResults>(
    SearchPerson(""),
  );
  useEffect(() => {
    const res = SearchPerson(query);
    setSearchResult(res);
    setIsDesktop(window.innerWidth > 768);
  }, [query]);
  useHotkeys(
    "mod+k",
    (event) => {
      event.preventDefault();
      // if the input is focused, blur it
      if (document.activeElement === queryRef.current) {
        queryRef.current?.blur();
        return;
      }
      queryRef.current?.focus();
    },
    {
      enableOnFormTags: true,
    },
  );

  return (
    <main>
      <div className="m-3 flex flex-col items-center justify-between gap-2 border-b py-2 text-start md:flex-row">
        <p className="text-2xl font-semibold md:text-3xl lg:text-4xl">
          {translation.header}
        </p>
        <Input
          ref={queryRef}
          className={`w-full md:max-w-72 ${translation.lang == "en" && "tracking-tighter"}`}
          placeholder={translation.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <List searchResult={searchResult} lang={translation.lang} query={query}/>
    </main>
  );
};

const Homepage = ({ translation }: { translation: Translation }) => {
  return (
    <Suspense
      fallback={
        <main>
          <div className="m-3 flex flex-col items-center justify-between gap-2 border-b py-2 text-start md:flex-row">
            <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              {translation.header}
            </h1>
            <Input
              className="w-full md:max-w-64"
              placeholder={translation.searchPlaceholder}
            />
          </div>

          <List searchResult={[]} lang={translation.lang} />
        </main>
      }
    >
      <Homepage_Sus translation={translation} />
    </Suspense>
  );
};

export default Homepage;
