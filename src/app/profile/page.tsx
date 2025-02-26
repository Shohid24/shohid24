import { getData } from "@/server/getData";
import AllProfiles from "./AllProfiles";


// Generate static params (needed even if empty for static generation)
export async function generateStaticParams() {
  return [];
}

async function fetchData() {
  const data = await getData();
  return { data };
}

export default async function Page() {
  // This will only run at build time for static exports
  const { data } = await fetchData();

  return <AllProfiles totalMartyrs={data.length}/>;
}

export const metadata = {
  metadataBase: new URL("https://shohid24.pages.dev"),
  title: "Find the profile of a martyr",
  description:
    "Shohid24 - Find the profile of a martyr in the July Student Movement in Bangladesh 2024. Find information about the hundreds of martyrs.",
};
