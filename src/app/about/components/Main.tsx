import { Translation } from "./translations";
import MaxWidthWrapper from "@/components/ui/MaxwidthWrapper";
import Balancer from "react-wrap-balancer";

const Main = ({ translation }: { translation: Translation }) => {
  return (
    <MaxWidthWrapper className="text-start">
      <div className="p-2">
        <h1 className="my-3 text-2xl font-semibold underline underline-offset-4 md:text-3xl lg:text-4xl">
          {translation.header}
        </h1>
        <Balancer
          key={translation.lang} // Change key to force re-render
          className="px-2 text-sm md:text-base animate-in fade-in-50"
          ratio={0.95}
          preferNative={false}
        >
          {translation.aboutText}
        </Balancer>
      </div>
    </MaxWidthWrapper>
  );
};

export default Main;
