import MaxWidthWrapper from "./ui/MaxwidthWrapper";
import Image from "next/image";

const Banner = () => {
  return (
    <MaxWidthWrapper className="flex h-36 w-full items-center justify-center bg-muted/50 py-10 md:h-64 md:justify-between">
      <q className="text-center text-xl font-bold leading-7 md:px-10 md:text-3xl lg:px-28 lg:text-4xl lg:leading-[3rem]">
        তোমরা হয়তো যাইবা ভুলে
        <br />
        <span className="text-red-500">খুনি <span className="text-red-600">হাসিনার</span></span> ইতিহাস,
        <br />
        সে মায়ে রাখবো মনে
        <br />
        যে ছুঁইছে পোলার <span className="text-red-500">লাশ</span>।
      </q>

      <div className="z-10 hidden h-full w-96 scale-50 md:block md:scale-95 lg:scale-100">
        <Image
          src="/photos/0.jpg"
          alt="Martyr Abu Said"
          width={1}
          height={1}
          className="animate-image-move-1 absolute -left-5 -top-9 h-32 w-32 rounded-full"
        />
        <Image
          src="/photos/9.jpg"
          alt="Martyr Mir Mugdha"
          width={1}
          height={1}
          className="animate-image-move-2 absolute -bottom-3 -right-3 h-24 w-24 rounded-full"
        />
        <Image
          src="/photos/2.jpg"
          alt="Martyr Wasim Akram"
          width={1}
          height={1}
          className="animate-image-move-3 absolute -bottom-7 -left-10 h-28 w-28 rounded-full"
        />
        <Image
          src="/photos/8.jpg"
          alt="Martyr Farhan Faiyaz"
          width={1}
          height={1}
          className="animate-image-move-4 absolute h-36 w-36 rounded-full"
        />
        <Image
          src="/photos/5.jpg"
          alt="Martyr Tahmid Tamim"
          width={1}
          height={1}
          className="animate-image-move-5 absolute right-0 top-0 h-20 w-20 rounded-full"
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default Banner;
