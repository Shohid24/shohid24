import MainSection from "../components/Main";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MongoConnection from "@/server/db";
import User, { IUser } from "@/server/schema/user";

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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-5">
        <h2 className="my-5 text-2xl font-semibold md:text-4xl">
          404 Profile not found
        </h2>
        <p>
          No profile with id=
          <code className="mx-1 rounded-md bg-primary/80 p-1 text-primary-foreground/80">
            {id}
          </code>{" "}
          found.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  // ✅ Convert Mongoose document to a plain JSON object
  const jsonUser: IUser = JSON.parse(JSON.stringify(user));

  return <MainSection martyr={jsonUser} />;
}
