import { Translation } from "./translations";
import MaxWidthWrapper from "@/components/ui/MaxwidthWrapper";
import Why from "./Why";





const Main = ({ translation }: { translation: Translation }) => {
  return (
    <MaxWidthWrapper className="text-start">
      <Why translation={translation} />
    </MaxWidthWrapper>
  );
};

export default Main;

