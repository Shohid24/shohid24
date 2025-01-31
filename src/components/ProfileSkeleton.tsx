import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

const ProfileSkeleton = () => {
  return (
    <div className="relative w-fit max-w-[150px] md:max-w-[190px] rounded-md border md:p-2.5 p-1.5 md:w-52">
      <Skeleton className="block aspect-square w-[min(150px,100%)] rounded-md object-cover hover:cursor-pointer md:w-[min(190px,100%)]" />
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
