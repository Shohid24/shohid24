import Balancer from "react-wrap-balancer";
import { Translation } from "./translations";

const Why = ({ translation }: { translation: Translation }) => {
  return (
    <div className="p-2">
      <h1 className="my-3 text-2xl font-semibold underline underline-offset-2 md:text-3xl lg:text-4xl">
        {translation.header}
      </h1>
      <Balancer
        key={translation.lang} // Change key to force re-render
        className="px-2 animate-in fade-in-50 md:text-lg text-base"
        ratio={0.95}
        preferNative={false}
      >
        {translation.aboutText}
      </Balancer>
    </div>
  );
};

export default Why;
