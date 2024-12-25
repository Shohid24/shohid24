import { MartyrList } from "@/lib/helpers/search";
import MainSection from "../components/Main";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function generateStaticParams() {
  return MartyrList.map((item) => ({ id: item.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const x = await params;
  const { id } = x;
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
