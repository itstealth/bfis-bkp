"use client";

import dynamic from "next/dynamic";

const ThankYouClient = dynamic(() => import("./ThankYouClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-8 bg-white/80 rounded-lg shadow-xl text-center">
        <div className="text-4xl font-bold text-gray-800 mb-4">Thank You!</div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  ),
});

export default function ThankYouWrapper() {
  return <ThankYouClient />;
}
