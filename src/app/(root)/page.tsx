import { getData } from "@/server/getData";
import Home from "./components/Home";
import type { Martyr } from "@/lib/types";

// This function runs at build time in production
export async function getStaticProps() {
  const data = await getData();

  return {
    props: {
      data,
    },
  };
}

const Root = ({ data }: { data: Martyr }) => {
  return <Home data={data} />;
};

export default Root;
