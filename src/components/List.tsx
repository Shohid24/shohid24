import React, { Suspense, useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import Profile from "./Profile";
import ProfileSkeleton from "./ProfileSkeleton";
import Pagination from "./sub/Pagination";
import { SearchResults, MartyrList, MartyrType } from "@/lib/helpers/search";

const List = ({
  searchResult,
  lang,
  query,
  currentPage,
  setCurrentPage,
}: {
  searchResult: SearchResults;
  lang: string;
  query: string;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}) => {
  const [wasFirstNill, setWasFirstNill] = useState(searchResult.length === 0);
  const [perPage, setPerPage] = useQueryState(
    "per",
    parseAsInteger.withDefault(24),
  );
  useEffect(() => {
    if (!wasFirstNill && searchResult.length > 0) {
      setCurrentPage(1);
      setWasFirstNill(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  if (query.trim().length > 0) {
    if (searchResult.length == 0) {
      return (
        <div className="flex h-52 items-center justify-center">
          <h2 className="text-2xl font-bold md:text-4xl">No results found</h2>
        </div>
      );
    }
    return (
      <>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
          {searchResult
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .map(({ item }, index) => {
              console.log("Hello world", item.id)
              return (
                <Profile
                  key={item.id}
                  index={searchResult.findIndex((i) => i.item.id === item.id)}
                  id={item.id}
                  name={item.name[lang as "bn" | "en"]}
                  profession={item.profession[lang as "bn" | "en"]}
                  info={item.info[lang as "bn" | "en"]}
                  martyrDate={item.date}
                  imageUrl={
                    item.hasImage ? `/photos/${item.id}.jpg` : "/default.jpg"
                  }
                  lang={lang as "bn" | "en"}
                />
              );
            })}
        </div>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalItems={searchResult.length}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
        {MartyrList.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage,
        ).map((item: MartyrType, index: number) => (
          <Profile
            key={item.id}
            index={MartyrList.findIndex((i) => i.id === item.id)}
            id={item.id}
            name={item.name[lang as "bn" | "en"]}
            profession={item.profession[lang as "bn" | "en"]}
            info={item.info[lang as "bn" | "en"]}
            martyrDate={item.date}
            imageUrl={item.hasImage ? `/photos/${item.id}.jpg` : "/default.jpg"}
            lang={lang as "bn" | "en"}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        totalItems={MartyrList.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const SuspendedList = ({
  searchResult,
  lang,
  query = "",
  currentPage,
  setCurrentPage,
}: {
  searchResult: SearchResults;
  lang: string;
  query?: string;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}) => {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
          {Array.from({ length: 24 }).map((_, index: number) => (
            <ProfileSkeleton key={index} />
          ))}
        </div>
      }
    >
      <List
        searchResult={searchResult}
        lang={lang}
        query={query}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Suspense>
  );
};

export default SuspendedList;
