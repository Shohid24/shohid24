// "use server"
import MongoConnection from "@/server/db";
import User from "@/server/schema/user";

import type { Martyr } from "@/lib/types";

// sorts by the date first, then by the name
export async function getData(): Promise<Martyr[]> {
  await MongoConnection();
  const users = await User.find({}).lean();

  const searchableData: Martyr[] = users
    .filter((user: any) => user.show)
    .map((user: any) => ({
      id: user.id,
      bn: user.bn,
      en: user.en,
      date: user.date,
      verified: user.verified,
      show: user.show,
      hasImage: !(user.image?.includes("default.jpg") ?? false),
    }));

  // Sort the data by date and then by en.name
  const sortedData = searchableData.sort((a, b) => {
    // First, sort by date
    const dateA = new Date(a.date.split("/").reverse().join("/"));
    const dateB = new Date(b.date.split("/").reverse().join("/"));
    const dateComparison = dateA.getTime() - dateB.getTime();

    // If dates are the same, sort by en.name
    if (dateComparison === 0) {
      // Safely compare names, handling cases where the name might be undefined
      const nameA = a.en?.name || "";
      const nameB = b.en?.name || "";
      return nameA.localeCompare(nameB);
    }

    // Return date comparison if dates are different
    return dateComparison;
  });

  return sortedData;
}
