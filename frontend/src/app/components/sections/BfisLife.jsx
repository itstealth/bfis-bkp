"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import WordPullUp from "@/app/components/ui/word-pull-up";
import Image from "next/image";

// Use public folder paths for images (place your images inside `publicassets/images/` and `publicassets/events/...`)
const galleryItems = [
  {
    id: 1,
    title: "Christmas celebration",
    date: "22 Dec 2025",
    image: "/assets/images/event2025new1.jpg",
    size: "large",
  },
  {
    id: 2,
    title: "Esperanza 25 Annual Day",
    date: "9 & 10 Dec 2025",
    image: "/assets/images/event2025new2.jpg",
    size: "small",
  },
  {
    id: 3,
    title: "Guru Purab Celebration",
    date: "4 Nov 2025",
    image: "/assets/images/event2025new6.jpg",
    size: "small",
  },
  

  {
    id: 5,
    title: "FAP India Award",
    date: "1 Dec 2025",
    image: "/assets/images/event2025new3.jpg",
    size: "small",
  },
  {
    id: 6,
    title: "MEET THE COMMUNITY HELPERS",
    date: "26 Nov 2025",
    image: "/assets/images/event2025new4.jpg",
    size: "small",
  },
  {
    id: 7,
    title: "Children's day (Kindergarten)",
    date: "14 Nov 2025",
    image: "/assets/images/event2025new5.jpg",
    size: "small",
  },
];

const BfisLife = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 space-y-4">
      <WordPullUp
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-nblue font-roboto mb-12"
        words="BFIS Life"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-lg ${
              item.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : item.size === "banner"
                ? "col-span-full"
                : ""
            }`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-video w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover w-full h-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={item.size === "large"}
              />

              {item.size !== "banner" && (
                <motion.div
                  initial={false}
                  animate={{
                    clipPath:
                      hoveredId === item.id
                        ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                        : "polygon(0 0, 50% 0, 0 50%, 0 0)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-nblue/70 flex flex-col justify-between p-4"
                >
                  <div className="text-white">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.date && (
                      <p className="text-sm text-white/70">{item.date}</p>
                    )}
                  </div>

                  {/* Eye Icon and Buttons */}
                  <div className="flex justify-between items-center">
                    <div
                      className="flex items-center gap-2 cursor-pointer text-white hover:text-vgreen transition-colors select-none"
                      onClick={() => router.push("/events")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        router.push("/events")
                      }
                      aria-label={`Read more about ${item.title}`}
                    >
                      <Eye className="h-5 w-5" />
                      <span>Read</span>
                    </div>
                    <button
                      className="bg-vgreen text-white px-3 py-1 rounded font-medium hover:bg-hgreen transition-colors select-none"
                      onClick={() => router.push("/events")}
                      type="button"
                      aria-label={`More details about ${item.title}`}
                    >
                      + More
                    </button>
                  </div>
                </motion.div>
              )}

              {item.size === "banner" && (
                <div className="absolute inset-0 bg-nblue -z-10 flex items-center justify-center p-4">
                  <h3 className="text-white font-bold text-center text-lg">
                    {item.title}
                  </h3>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BfisLife;
