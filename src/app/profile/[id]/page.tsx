import { MartyrList } from "@/lib/helpers/search";
import MainSection from "../components/Main";

export function generateStaticParams() {
  return MartyrList.map((item) => ({ id: item.id }));
}

export default async function PersonProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;
  const martyr = MartyrList.find((martyr) => martyr.id === id);
  
  if (!martyr) return <div>Nothing</div>;
  return <MainSection martyr={martyr} />;
}
