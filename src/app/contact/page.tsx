import { HOSTED_URL } from "@/lib/constants";
import Contact from "./Contact";

const Page = () => {
  return <Contact />;
};

export default Page;

export const metadata = {
  metadataBase: new URL(HOSTED_URL),
  title: "Contact",
  description:
    "Contact with Shohid24 for any queries, suggestions, or feedback. We are always here to help you.",
};
