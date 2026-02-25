"use client";

import TopHeader from "@/app/header/TopHeader";
import Navbar from "@/app/header/Navbar";

export default function Header() {
  return (
    <header className="font-sans">
      <TopHeader />
      <Navbar />
    </header>
  );
}
