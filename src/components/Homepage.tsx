import { useState, useRef, useEffect, Suspense, useTransition } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SearchPerson } from "@/lib/helpers/search";
import { Input } from "./ui/input";
import { toBengali } from "@/lib/helpers/date";
import List from "@/components/List";
import type { Translation } from "@/components/translations";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

const Homepage_Sus = ({ translation }: { translation: Translation }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [isSearching, startTransition] = useTransition();
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault(""),
  );
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const queryRef = useRef<HTMLInputElement | null>(null);

  const [searchResult, setSearchResult] = useState(SearchPerson(""));
  const [totalMartyr] = useState(searchResult.length);

  useEffect(() => {
    startTransition(() => {
      const res = SearchPerson(query);
      setSearchResult(res);
    });
    if (firstLoad) {
      return setFirstLoad(false);
    }
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  useHotkeys(
    "esc",
    () => {
      // blue the currently focused input
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
    },
    {
      enableOnFormTags: true,
    },
  );

  return (
    <main>
      <div className="m-3 flex flex-col items-center justify-between gap-2 border-b py-2 text-start md:flex-row">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          {translation.header}
        </h1>
        <Input
          ref={queryRef}
          className={`w-full md:max-w-72 ${translation.lang == "en" && "tracking-tighter"}`}
          placeholder={translation.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <p
        className={`-mt-1 mb-2 tracking-wide transition-all duration-100 md:text-lg ${query.length === 0 ? "scale-0" : ""}`}
      >
        {translation.lang === "en" ? (
          !isSearching ? (
            <>
              Found{" "}
              <span className="inline-block w-8 font-bold text-red-700 dark:text-red-500">
                {searchResult.length}
              </span>{" "}
              matching person
            </>
          ) : (
            "Searching..."
          )
        ) : !isSearching ? (
          <>
            <span className="inline-block w-8 font-bold text-red-700 dark:text-red-500">
              {toBengali(searchResult.length)}
            </span>{" "}
            জন এর রেজাল্ট দেখানো হচ্ছে
          </>
        ) : (
          "খোঁজা হচ্ছে..."
        )}
      </p>
      <p
        className={`-mt-8 mb-2.5 font-bold tracking-wide transition-all duration-100 md:text-lg ${query.length === 0 ? "" : "scale-0"}`}
      >
        {translation.lang == "en" ? (
          <>
            Out list currently has{" "}
            <span className="inline-block w-8 font-bold text-red-700 dark:text-red-500">
              {totalMartyr}
            </span>{" "}
            martyrs
          </>
        ) : (
          <>
            আমাদের তালিকায় বর্তমানে{" "}
            <span className="inline-block w-8 font-bold text-red-700 dark:text-red-500">
              {toBengali(totalMartyr)}
            </span>{" "}
            জন শহীদ রয়েছেন
          </>
        )}
      </p>

      <List
        searchResult={searchResult}
        lang={translation.lang}
        query={query}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

const Homepage = ({ translation }: { translation: Translation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Suspense
      fallback={
        <main>
          <div className="m-3 flex flex-col items-center justify-between gap-2 border-b py-2 text-start md:flex-row">
            <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
              {translation.header}
            </h1>
            <Input
              className="w-full md:max-w-64"
              placeholder={translation.searchPlaceholder}
            />
          </div>

          <List
            searchResult={[]}
            lang={translation.lang}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      }
    >
      <Homepage_Sus translation={translation} />
    </Suspense>
  );
};

export default Homepage;
