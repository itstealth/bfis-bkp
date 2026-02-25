"use client";

import dynamic from "next/dynamic";

const ProgramClient = dynamic(() => import("./ProgramClient"), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-[#e4eff9] py-8 md:py-16">
      <div className="w-[90%] mx-auto md:max-w-7xl">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-nblue">
            Loading programs...
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function ProgramWrapper() {
  return <ProgramClient />;
}
