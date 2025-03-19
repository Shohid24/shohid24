import MongoConnection from "@/server/db";
import User, { IUser } from "@/server/schema/user";
import MainSection from "../components/Main";
import { getData } from "@/server/getData";
import { notFound } from "next/navigation";
import { getTwoRandom } from "@/lib/utils";
import { HOSTED_URL } from "@/lib/constants";

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
  const isDefaultImage = user?.image.endsWith("default.jpg");

  if (!user) {
    return {
      title: "404 Profile Not Found - Martyr Records",
      description:
        "The profile you are looking for does not exist. Please check the ID or return to the homepage.",
    };
  }

  return {
    title: `${user.bn.name} - ${user.en.name}'s Profile - Shohid24`,
    description: `${user.en.name}, a selfless martyr from the July Revolution in Bangladesh. Known for contribution as a ${user.en.profession}, martyred on ${user.date}, ${user.en.info}. View full details on Shohid24 (শহীদ২৪).`,
    metadataBase: new URL(HOSTED_URL),
    openGraph: {
      images: [isDefaultImage ? "/default.jpg" : `/photos/${id}.jpg`],
    },
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
