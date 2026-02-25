"use client";

import dynamic from "next/dynamic";

const AcademicsClient = dynamic(() => import("./AcademicsClient"), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-[#e4eff9] to-white">
      <div className="relative h-screen flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-nblue mb-4">
            Academic Excellence at BFIS
          </div>
          <div className="text-lg md:text-xl text-gray-800">
            Discover our comprehensive programs for academic and personal
            growth.
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function AcademicsWrapper() {
  return <AcademicsClient />;
}
