"use client";

import dynamic from "next/dynamic";

const SportsClient = dynamic(() => import("./SportsClient"), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] bg-gray-200 flex items-center justify-center">
        <div className="text-6xl font-bold text-gray-600">Sports</div>
      </div>
      <div className="py-16 px-4 text-center">
        <div className="text-2xl font-bold text-gray-800">
          Loading sports...
        </div>
      </div>
    </div>
  ),
});

export default function SportsWrapper() {
  return <SportsClient />;
}
