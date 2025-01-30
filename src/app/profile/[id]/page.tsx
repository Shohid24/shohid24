import { MartyrList } from "@/lib/helpers/search";
import MainSection from "../components/Main";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function generateStaticParams() {
  return MartyrList.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const martyr = MartyrList.find((m) => m.id === id);

  if (!martyr) {
    return {
      title: "404 Profile Not Found - Martyr Records",
      description:
        "The profile you are looking for does not exist. Please check the ID or return to the homepage.",
    };
  }

  return {
    title: `${martyr.name.en}'s Profile - July Martyr`,
    description: `${martyr.name.en}, a selfless martyr from the July Revolution in Bangladesh. Known for contributions as a ${martyr.profession.en}, martyred on ${martyr.date}, ${martyr.info.en}. View full details on Shohid24.`,
    metadataBase: new URL("https://shohid24.pages.dev"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const martyr = MartyrList.find((martyr) => martyr.id === id);

  if (!martyr) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-5">
        <h2 className="my-5 text-2xl font-semibold md:text-4xl">
          404 Profile not found
        </h2>
        <p>
          No profile with id=
          <code className="mx-1 rounded-md bg-primary/80 p-1 text-primary-foreground/80">
            {String(id)}
          </code>{" "}
          found.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }
  return <MainSection martyr={martyr} />;
}
