"use client";

import dynamic from "next/dynamic";

const NewsletterClient = dynamic(() => import("./NewsletterClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2196F3]/10 to-[#4CAF50]/10 p-8">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8">
        <div className="text-4xl font-bold text-[#2196F3] mb-6 text-center">
          Newsletter
        </div>
        <div className="space-y-4">
          <div className="bg-[#4CAF50] text-white py-4 rounded-lg text-center">
            Loading newsletters...
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function NewsletterWrapper() {
  return <NewsletterClient />;
}
