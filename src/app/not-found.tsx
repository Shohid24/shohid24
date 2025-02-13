"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const NotFound = () => {
  const [lang, setLang] = useState("bn");
  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />
    </div>
  );
};

export default NotFound;
