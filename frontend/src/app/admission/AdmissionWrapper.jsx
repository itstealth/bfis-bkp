"use client";

import dynamic from "next/dynamic";

const AdmissionClient = dynamic(() => import("./AdmissionClient"), {
  ssr: true,
  loading: () => (
    <div className="bg-gradient-to-r from-[#e4eff9] to-white p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-3xl md:text-5xl font-bold text-nblue mb-4">
            Start Your Journey Here
          </div>
          <p className="text-lg text-gray-700">
            Apply now for exciting programs and shape your future in education.
          </p>
        </div>
        <div>Loading admission information...</div>
      </div>
    </div>
  ),
});

export default function AdmissionWrapper() {
  return <AdmissionClient />;
}
