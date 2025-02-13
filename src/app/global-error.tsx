"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { HomeIcon, RotateCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ServerError = () => {
  const [lang, setLang] = useState("bn");
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="space-y-8">
            {/* Large 500 Text */}
            <h1 className="text-8xl font-bold text-red-500">500</h1>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-red-700">
                {lang === "bn" ? "সার্ভার ত্রুটি" : "Server Error"}
              </h2>
              <p className="text-red-600">
                {lang === "bn"
                  ? "দুঃখিত, সার্ভারে একটি ত্রুটি ঘটেছে। কিছুক্ষণ পর আবার চেষ্টা করুন।"
                  : "Sorry, something went wrong on our server. Please try again later."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-lg border-2 border-red-200 px-6 py-3 text-red-600 transition-colors hover:bg-red-50"
              >
                <RotateCcwIcon size={20} />
                {lang === "bn" ? "পুনরায় চেষ্টা করুন" : "Try Again"}
              </button>

              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600"
              >
                <HomeIcon size={20} />
                {lang === "bn" ? "হোম পেজে যান" : "Go Home"}
              </button>
            </div>

            {/* Additional Help Text */}
            <p className="text-sm text-red-400">
              {lang === "bn"
                ? "যদি সমস্যাটি চলতে থাকে, অনুগ্রহ করে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।"
                : "If the problem persists, please contact our support team."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerError;
