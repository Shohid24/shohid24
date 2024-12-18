/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import ProfileSkeleton from "./ProfileSkeleton";
import { Calendar } from "lucide-react";
import type { Profile } from "@/lib/types";

const Profile = ({
  id = 1,
  name,
  profession,
  info,
  martyrDate,
  imageUrl,
}: Profile) => {
  const variables = [name, profession, info, martyrDate];
  const allUndefined = variables.every((v) => v === undefined);
  if (allUndefined) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="flex h-full w-52 flex-col items-center rounded-md border p-2.5">
      <div className="relative">
        <span className="absolute left-0 top-0 h-7 min-w-8 rounded-md bg-red-500 px-1 text-xl font-black text-gray-200">
          {id}
        </span>
        <Image
          src={imageUrl || ""}
          alt={name || "Unknown"}
          width={1} // not needed
          height={1} // not needed
          className="aspect-square w-52 rounded-md object-cover hover:cursor-pointer"
        />
      </div>
      <div className="my-2 flex h-full w-full flex-col text-start">
        <p className="text-lg font-bold md:text-xl">{name}</p>
        <p className="text-muted-foreground">
          {profession || "তথ্য অনুপস্থিত"}
        </p>
        <p>{info || "তথ্য অনুপস্থিত"}</p>
        <p className="mt-auto flex items-center justify-start gap-1">
          <Calendar size={20} />
          {martyrDate}
        </p>
      </div>
    </div>
  );
};

export default Profile;
