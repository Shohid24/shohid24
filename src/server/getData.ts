// "use server"
import MongoConnection from "@/server/db";
import User from "@/server/schema/user";

import type { Martyr } from "@/lib/types";

export async function getData(): Promise<Martyr[]> {
  await MongoConnection();
  // Fetch all users
  const users = await User.find({}).lean();

  // Transform the data
  const searchableData: Martyr[] = users
    .filter((user) => user.show)
    .map((user) => ({
      id: user.id.toString(),
      name: {
        bn: user.bn.name,
        en: user.en.name,
      },
      profession: {
        bn: user.bn.profession,
        en: user.en.profession,
      },
      info: {
        bn: user.bn.info,
        en: user.en.info,
      },
      date: user.date,
      hasImage: !(user.image?.includes("default.jpg") ?? false),
    }));

  // Sort the data by date
  const sortedData = searchableData.sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("/"));
    const dateB = new Date(b.date.split("/").reverse().join("/"));
    return dateA.getTime() - dateB.getTime();
  });

  return sortedData;
}
