import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

const ProfileSkeleton = () => {
  return (
    <div className="flex w-52 flex-col items-center rounded-md border p-2.5">
      <Skeleton className="h-[186px] w-[186.4px] rounded-md hover:cursor-pointer" />
      <div className="my-2 flex w-full flex-col gap-2">
        <Skeleton className="h-6 w-32 rounded-sm" />
        <Skeleton className="h-4 w-16 rounded-sm" />
        <Skeleton className="h-[17px] w-36 rounded-sm" />
        <Skeleton className="h-[17px] w-14 rounded-sm" />
        <span className="mt-1.5 mb-0.5 flex items-center gap-1">
          <Calendar size={20} />
          <Skeleton className="h-5 w-24 rounded-sm" />
        </span>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
