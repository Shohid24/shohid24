import { HOSTED_URL } from "@/lib/constants";
import AboutPage from "./About";

const Page = () => {
  return <AboutPage />;
};

export default Page;

export const metadata = {
  metadataBase: new URL(HOSTED_URL),
  title: "About Shohid24 - Listing all the martyrs of July Movement",
  description:
    "Shohid24 is a website listing the martyrs of the July Student Movement that happened in Bangladesh. And it shows how brutally fascist PM. Sheikh Hasina had killed thousands of innocent souls.",
};
