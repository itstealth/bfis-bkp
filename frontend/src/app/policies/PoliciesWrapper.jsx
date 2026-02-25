"use client";

import dynamic from "next/dynamic";

const PoliciesClient = dynamic(() => import("./PoliciesClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600">
            Policies & Governance
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Loading policies...
          </p>
        </div>
      </div>
    </div>
  ),
});

export default function PoliciesWrapper() {
  return <PoliciesClient />;
}
