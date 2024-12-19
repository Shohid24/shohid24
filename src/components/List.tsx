import React, { Suspense, useEffect } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import Profile from "./Profile";
import ProfileSkeleton from "./ProfileSkeleton";
import Pagination from "./sub/Pagination";
// import { DateConverter } from "@/lib/helpers/date";
import DATA_BN from "../../public/shortData_bn.json";
import DATA_EN from "../../public/shortData_en.json";

type ProfileData = (string | number)[];

const List = ({ searchResult }: { searchResult: string[] }) => {
  const [perPage, setPerPage] = useQueryState(
    "per",
    parseAsInteger.withDefault(24),
  );
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResult, setCurrentPage]);

  const actualData = DATA_BN;

  
  if (searchResult.length > 0) {
    return (
      <>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
          {searchResult
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .map((id: string, index: number) => {
              return (
                <Profile
                  key={index}
                  id={Number(id) + 1}
                  name={String(actualData[Number(id)][1])}
                  profession={String(actualData[Number(id)][2])}
                  info={String(actualData[Number(id)][3])}
                  martyrDate={String(actualData[Number(id)][4])}
                  imageUrl={
                    Number(actualData[Number(id)][5]) == 1
                      ? `/photos/${id}.jpg`
                      : "/default.jpg"
                  }
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
        {actualData
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((item: ProfileData, index: number) => (
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
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        totalItems={actualData.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const SuspendedList = ({ searchResult }: { searchResult: string[] }) => (
  <Suspense
    fallback={
      <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-y-2 md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
        {Array.from({ length: 24 }).map((_, index: number) => (
          <ProfileSkeleton key={index} />
        ))}
      </div>
    }
  >
    <List searchResult={searchResult} />
  </Suspense>
);

export default SuspendedList;
