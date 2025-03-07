"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const [lang, setLang] = useState("bn");
  const router = useRouter();

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="space-y-8">
            {/* Large 404 Text */}
            <h1 className="text-8xl font-bold text-red-500">404</h1>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-red-700">
                {lang === "bn" ? "পৃষ্ঠাটি পাওয়া যায়নি" : "Page Not Found"}
              </h2>
              <p className="text-red-600">
                {lang === "bn"
                  ? "দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।"
                  : "Sorry, the page you are looking for could not be found."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 rounded-lg border-2 border-red-200 px-6 py-3 text-red-600 transition-colors hover:bg-red-50"
              >
                <ArrowLeftIcon size={20} />
                {lang === "bn" ? "পিছনে যান" : "Go Back"}
              </button>

              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600"
              >
                <HomeIcon size={20} />
                {lang === "bn" ? "হোম পেজে যান" : "Go Home"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
