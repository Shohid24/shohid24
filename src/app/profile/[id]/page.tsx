import MongoConnection from "@/server/db";
import User, { IUser } from "@/server/schema/user";
import MainSection from "../components/Main";
import { getData } from "@/server/getData";
import { notFound } from "next/navigation";
import { getTwoRandom } from "@/lib/utils";

await MongoConnection();

export async function generateStaticParams() {
  const users = await User.find({}, "id").lean();
  return users.map((user) => ({ id: user.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await User.findOne({ id: id }).lean()) as IUser | null;

  if (!user) {
    return {
      title: "404 Profile Not Found - Martyr Records",
      description:
        "The profile you are looking for does not exist. Please check the ID or return to the homepage.",
    };
  }

  return {
    title: `${user.en.name}'s Profile - July Martyr`,
    description: `${user.en.name}, a selfless martyr from the July Revolution in Bangladesh. Known for contributions as a ${user.en.profession}, martyred on ${user.date}, ${user.en.info}. View full details on Shohid24.`,
    metadataBase: new URL("https://shohid24.pages.dev"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await User.findOne({ id: id }).lean()) as IUser | null;
  const data = (await getData()).filter(
    (item) => item.verified && item.bn.info && item.id !== id,
  );
  const seeAlso = getTwoRandom(data);

  if (!user) {
    return notFound();
  }

  // ✅ Convert Mongoose document to a plain JSON object
  const jsonUser: IUser = JSON.parse(JSON.stringify(user));

  return <MainSection martyr={jsonUser} seeAlso={seeAlso} />;
}
