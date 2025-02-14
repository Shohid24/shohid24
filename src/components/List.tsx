// TODO: Simplify this file

import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import Profile from "./Profile";
import ProfileSkeleton from "./ProfileSkeleton";
import Pagination from "./sub/Pagination";
import { MartyrList } from "@/lib/helpers/search";
import type { SearchResults } from "@/lib/types";
import { formatDate } from "@/lib/helpers/date";

const ITEMS_PER_LOAD = 24;

const List = ({
  viewAs,
  setViewAs,
  searchResult,
  lang,
  query,
  currentPage,
  setCurrentPage,
}: {
  viewAs: string;
  setViewAs: (value: string) => void;
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
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!wasFirstNill && searchResult.length > 0) {
      setCurrentPage(1);
      setWasFirstNill(false);
    }
    // Reset visible items when search results change
    setVisibleItems(ITEMS_PER_LOAD);
  }, [searchResult, setCurrentPage, wasFirstNill]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && viewAs === "all") {
        setIsLoading(true);
        setTimeout(() => {
          const dataLength =
            query.trim().length > 0 ? searchResult.length : MartyrList.length;

          if (visibleItems < dataLength) {
            setVisibleItems((prev) =>
              Math.min(prev + ITEMS_PER_LOAD, dataLength),
            );
          }
          setIsLoading(false);
        }, 100); // Small delay to prevent rapid loading
      }
    },
    [isLoading, viewAs, visibleItems, query, searchResult.length],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  const RenderProfiles = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {
      data,
      startIndex,
      endIndex = null,
      searchRes = false,
    }: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any[];
      startIndex: number;
      endIndex?: number | null;
      searchRes?: boolean;
    },
  ) => {
    const itemsToRender = endIndex
      ? data.slice(startIndex, endIndex)
      : data.slice(0, visibleItems);
    if (searchRes) {
      return itemsToRender.map(({ item }) => {
        return (
          <Profile
            key={item.id}
            index={data.findIndex((i) => i.item.id === item.id)}
            id={item.id}
            name={item.name[lang as "bn" | "en"]}
            profession={item.profession[lang as "bn" | "en"]}
            info={item.info[lang as "bn" | "en"]}
            martyrDate={formatDate(item.date)}
            imageUrl={item.hasImage ? `/photos/${item.id}.jpg` : "/default.jpg"}
            lang={lang as "bn" | "en"}
          />
        );
      });
    }

    return itemsToRender.map((item) => {
      return (
        <Profile
          key={item.id}
          index={data.findIndex((i) => i.id === item.id)}
          id={item.id}
          name={item.name[lang as "bn" | "en"]}
          profession={item.profession[lang as "bn" | "en"]}
          info={item.info[lang as "bn" | "en"]}
          martyrDate={formatDate(item.date)}
          imageUrl={item.hasImage ? `/photos/${item.id}.jpg` : "/default.jpg"}
          lang={lang as "bn" | "en"}
        />
      );
    });
  };

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
          {viewAs === "all" ? (
            <RenderProfiles
              searchRes={true}
              data={searchResult}
              startIndex={0}
            />
          ) : (
            <RenderProfiles
              searchRes={true}
              data={searchResult}
              startIndex={(currentPage - 1) * perPage}
              endIndex={currentPage * perPage}
            />
          )}
        </div>
        {viewAs === "page" ? (
          <Pagination
            currentPage={currentPage}
            perPage={perPage}
            totalItems={searchResult.length}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          visibleItems < searchResult.length && (
            <div ref={loaderRef} className="flex justify-center py-4">
              <ProfileSkeleton />
            </div>
          )
        )}
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
        {viewAs === "all" ? (
          <RenderProfiles data={MartyrList} startIndex={0} />
        ) : (
          <RenderProfiles
            data={MartyrList}
            startIndex={(currentPage - 1) * perPage}
            endIndex={currentPage * perPage}
          />
        )}
      </div>

      {viewAs === "page" ? (
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalItems={MartyrList.length}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        visibleItems < MartyrList.length && (
          <div ref={loaderRef} className="flex justify-center py-4">
            <ProfileSkeleton />
          </div>
        )
      )}
    </>
  );
};

const SuspendedList = ({
  viewAs,
  setViewAs,
  searchResult,
  lang,
  query = "",
  currentPage,
  setCurrentPage,
}: {
  viewAs: string;
  setViewAs: (value: string) => void;
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
        viewAs={viewAs}
        setViewAs={setViewAs}
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
