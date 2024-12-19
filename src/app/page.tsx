
"use client";
import { useState } from "react";

import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import MaxwidthWrapper from "@/components/ui/MaxwidthWrapper";
import Hero from "@/components/Hero";
import Homepage from "@/components/Homepage";
import Footer from "@/components/Footer";
import Link from "next/link";

const interFont = Inter({ subsets: ["latin"] });

const Home = () => {
  const [isEnglish] = useState(false);
  return (
    <>
      <Navbar />
      <Hero />
      <MaxwidthWrapper className={isEnglish ? interFont.className : ""}>
        <header className="my-5 inline-block text-2xl font-bold text-red-700 decoration-sky-600 underline-offset-4 hover:underline dark:text-red-500">
          <Link href="https://github.com/Nusab19/shohid24">
            Site is still under development &rarr;
          </Link>
        </header>
        <Homepage />
      </MaxwidthWrapper>
      <Footer />
    </>
  );
};

export default Home;
