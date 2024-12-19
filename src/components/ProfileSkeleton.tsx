import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

const ProfileSkeleton = () => {
  return (
    <div className="flex h-full w-40 flex-col items-center rounded-md border p-2.5 md:w-52">
      <Skeleton className="md:h-[186px] md:w-[186px] h-[138px] w-[138px] rounded-md hover:cursor-pointer" />
      <div className="my-2 flex w-full flex-col gap-2">
        <Skeleton className="h-6 w-32 rounded-sm" />
        <Skeleton className="h-4 w-16 rounded-sm" />
        <Skeleton className="h-[17px] w-36 rounded-sm" />
        <Skeleton className="h-[17px] w-14 rounded-sm" />
        <span className="mb-0.5 mt-1.5 flex items-center gap-1">
          <Calendar size={20} />
          <Skeleton className="h-5 w-24 rounded-sm" />
        </span>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
