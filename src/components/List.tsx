import React, { Suspense, useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import Profile from "./Profile";
import ProfileSkeleton from "./ProfileSkeleton";
import Pagination from "./sub/Pagination";
import { MartyrList } from "@/lib/helpers/search";
import type { SearchResults, Martyr, ProfileType } from "@/lib/types";
import { formatDate } from "@/lib/helpers/date";

// Extracted common grid layout
const GridLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
    {children}
  </div>
);

// Extracted profile props creation logic
const createProfileProps = (
  item: Martyr,
  index: number,
  lang: "bn" | "en",
): ProfileType => ({
  index: index,
  id: item.id,
  name: item.name[lang],
  profession: item.profession[lang],
  info: item.info[lang],
  martyrDate: formatDate(item.date),
  imageUrl: item.hasImage ? `/photos/${item.id}.jpg` : "/default.jpg",
  lang: lang,
});

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
  const [perPage] = useQueryState("per", parseAsInteger.withDefault(24));

  useEffect(() => {
    if (!wasFirstNill && searchResult.length > 0) {
      setCurrentPage(1);
      setWasFirstNill(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  // Helper function for pagination
  const getPaginatedItems = <T extends { item?: Martyr; id?: string }>(
    items: T[],
    page: number,
    itemsPerPage: number,
  ) => items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (query.trim().length > 0) {
    if (searchResult.length === 0) {
      return (
        <div className="flex h-52 items-center justify-center">
          <h2 className="text-2xl font-bold md:text-4xl">No results found</h2>
        </div>
      );
    }

    const paginatedResults = getPaginatedItems(
      searchResult,
      currentPage,
      perPage,
    );

    return (
      <>
        <GridLayout>
          {paginatedResults.map(({ item }) => (
            <Profile
              key={item.id}
              {...createProfileProps(
                item,
                searchResult.findIndex((i) => i.item.id === item.id),
                lang as "bn" | "en",
              )}
            />
          ))}
        </GridLayout>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalItems={searchResult.length}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  }

  const paginatedMartyrList = getPaginatedItems(
    MartyrList,
    currentPage,
    perPage,
  );

  return (
    <>
      <GridLayout>
        {paginatedMartyrList.map((item) => (
          <Profile
            key={item.id}
            {...createProfileProps(
              item,
              MartyrList.findIndex((i) => i.id === item.id),
              lang as "bn" | "en",
            )}
          />
        ))}
      </GridLayout>
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
        <GridLayout>
          {Array.from({ length: 24 }).map((_, index: number) => (
            <ProfileSkeleton key={index} />
          ))}
        </GridLayout>
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
