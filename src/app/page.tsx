import Link from "next/link";

const Home = () => {
  return (
    <div >
      <h1 className="text-5xl text-center font-bold my-10">Shohid24</h1>
      <p className="text-balance text-center max-w-screen-md mx-auto text-xl font-semibold text-primary/80">
        An open-source website listing the martyrs of the July Student Movement
        2024 in Bangladesh
      </p>
      <p className="mt-[60vh] w-fit mx-auto text-blue-500 font-bold">Under Development in <Link href="https://github.com/Nusab19/shohid24" className="text-gray-800 font-black hover:underline underline-offset-2">Github</Link></p>
    </div>
  );
};

export default Home;
