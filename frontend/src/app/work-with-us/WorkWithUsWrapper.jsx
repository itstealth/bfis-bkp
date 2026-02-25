"use client";

import dynamic from "next/dynamic";

const WorkWithUsClient = dynamic(() => import("./WorkWithUsClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-[#26A69A]/5 to-[#9C27B0]/5 flex items-center justify-center md:p-8">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-md md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 md:p-12">
            <div className="text-3xl md:text-5xl font-bold text-[#2196F3] mb-4">
              Join Our Visionary Team
            </div>
            <p className="text-gray-600 mb-6">
              Loading career opportunities...
            </p>
          </div>
          <div className="relative bg-gray-200 h-64 md:h-auto"></div>
        </div>
      </div>
    </div>
  ),
});

export default function WorkWithUsWrapper() {
  return <WorkWithUsClient />;
}
