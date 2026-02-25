"use client";

import dynamic from "next/dynamic";

const EventsClient = dynamic(() => import("./EventsClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] bg-[#f4f8fb] flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold text-nblue">Events Gallery</h1>
        <p className="text-nblue/70">Loading events...</p>
      </div>
    </div>
  ),
});

export default function EventsWrapper() {
  return <EventsClient />;
}
