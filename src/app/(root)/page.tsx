import { getData } from "@/server/getData";
import Home from "./components/Home";

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
  // return <div>Hello {JSON.stringify(data[0])}</div>
  return <Home data={data} lastUpdated={lastUpdated} />;
}
