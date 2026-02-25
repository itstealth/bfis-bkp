"use client";

import dynamic from "next/dynamic";

const GlimpseClient = dynamic(() => import("./GlimpseClient"), {
  ssr: true,
  loading: () => (
    <section className="relative min-h-screen container bg-[#f4f8fb] py-12">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-3xl lg:text-5xl font-bold text-nblue">
          Glimpse of BFIS
        </h1>
        <p className="text-xl text-nblue/70">
          Discover our state-of-the-art facilities and achievements.
        </p>
        <p className="text-nblue/60">Loading gallery...</p>
      </div>
    </section>
  ),
});

export default function GlimpseWrapper() {
  return <GlimpseClient />;
}
