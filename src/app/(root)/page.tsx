import { getData } from "@/server/getData";
import Home from "./components/Home";

// Mark the page as statically generated
export const dynamic = "force-static";

// Generate static params (needed even if empty for static generation)
export async function generateStaticParams() {
  return [];
}

async function fetchData() {
  const data = await getData();
  const lastUpdated = new Date().toISOString();
  return { data, lastUpdated };
}

export default async function Page() {
  // This will only run at build time for static exports
  const { data, lastUpdated } = await fetchData();

  console.log("Last updated:", lastUpdated);
  return <Home data={data} lastUpdated={lastUpdated} />;
}
