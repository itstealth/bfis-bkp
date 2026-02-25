"use client";

import dynamic from "next/dynamic";

const NewsCoverageClient = dynamic(() => import("./NewsCoverageClient"), {
  ssr: true,
  loading: () => (
    <div className="min-h-[50vh] bg-[#f4f8fb] flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold text-nblue">News Coverage</h1>
        <p className="text-nblue/70">Loading news coverages...</p>
      </div>
    </div>
  ),
});

export default function NewsCoverageWrapper() {
  return <NewsCoverageClient />;
}
