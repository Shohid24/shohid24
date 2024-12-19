import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="">
      {/* <Image src="/images/bg.jpg" width={1} height={1} alt="Background Image" className="w-full h-auto"/> */}
      <Link
        href="https://forms.gle/efEVqZEHHR4fZuyG7"
        className="rounded-full bg-red-600 p-4 text-lg font-bold text-gray-100 md:text-xl"
        target="_blank"
      >
        শহীদদের তথ্য দিন
      </Link>
    </div>
  );
};

export default Hero;
