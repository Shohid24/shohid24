import React, { Suspense } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import Profile from "./Profile";
import ProfileSkeleton from "./ProfileSkeleton";
import Pagination from "./sub/Pagination";
// import { DateConverter } from "@/lib/helpers/date";
import DATA from "../../public/shortData.json";

type ProfileData = (string | number)[];

const List = () => {
  const [perPage, setPerPage] = useQueryState(
    "per",
    parseAsInteger.withDefault(24),
  );
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
        {DATA.slice((currentPage - 1) * perPage, currentPage * perPage).map(
          (item: ProfileData, index: number) => (
            <Profile
              key={index}
              id={Number(item[0]) + 1}
              name={String(item[1])}
              profession={String(item[2])}
              info={String(item[3])}
              martyrDate={String(item[4])}
              imageUrl={
                Number(item[5]) == 1 ? `/photos/${item[0]}.jpg` : "/default.jpg"
              }
            />
          ),
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        totalItems={DATA.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const SuspendedList = () => (
  <Suspense
    fallback={
      <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
        {Array.from({ length: 20 }).map((_, index: number) => (
          <ProfileSkeleton key={index} />
        ))}
      </div>
    }
  >
    <List />
  </Suspense>
);

export default SuspendedList;
