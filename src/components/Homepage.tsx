import { useState, useRef, useEffect, Suspense } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SearchPerson } from "@/lib/helpers/search";
import List from "./List";
import { Input } from "./ui/input";
import { parseAsString, useQueryState } from "nuqs";

import ProfileSkeleton from "./ProfileSkeleton";

const Homepage_Sus = () => {
  // const [query, setQuery] = useState("");
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault(""),
  );
  const queryRef = useRef<HTMLInputElement | null>(null);

  const [searchResult, setSearchResult] = useState<string[]>(SearchPerson(""));
  useEffect(() => {
    const res = SearchPerson(query);
    setSearchResult(res);
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
        <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
          আন্দোলনে <span className="text-red-600">শহীদদের</span> তালিকা
        </p>
        <Input
          ref={queryRef}
          className="w-full md:max-w-64"
          placeholder="নাম, প্রতিষ্ঠান বা পেশা সার্চ করুন (ctrl+k)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <List searchResult={searchResult} />
    </main>
  );
};

const Homepage = () => (
  <Suspense
    fallback={
      <main>
        <div className="m-3 flex flex-col items-center justify-between gap-2 border-b py-2 text-start md:flex-row">
          <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
            আন্দোলনে <span className="text-red-600">শহীদদের</span> তালিকা
          </p>
          <Input
            className="w-full md:max-w-64"
            placeholder="নাম, প্রতিষ্ঠান বা পেশা সার্চ করুন (ctrl+k)"
          />
        </div>

        <List searchResult={[]} />
      </main>
    }
  >
    <Homepage_Sus />
  </Suspense>
);

export default Homepage;
