"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import WordPullUp from "@/app/components/ui/word-pull-up";
import WordFadeIn from "@/app/components/ui/word-fade-in";
import {
  Trophy,
  Music,
  Book,
  FlaskRoundIcon as Flask,
  Users,
  Palette,
} from "lucide-react";

const activities = [
  {
    id: "sports",
    title: "Sports Excellence",
    description:
      "State-of-the-art sports facilities including football, cricket, basketball, and athletics tracks.",
    icon: <Trophy className="h-10 w-10" />,
    image: "/assets/images/lifeOne.jpg",
    stats: "15+ Sports Activities",
  },
  {
    id: "arts",
    title: "Arts",
    description:
      "Dedicated spaces for music, dance, and theater to nurture artistic talents.",
    icon: <Music className="h-10 w-10" />,
    image: "/assets/images/lifetwo.jpg",
    stats: "10+ Cultural Events",
  },
  {
    id: "science",
    title: "Science Labs",
    description:
      "Well-equipped laboratories for practical learning in physics, chemistry, and biology.",
    icon: <Flask className="h-10 w-10" />,
    image: "/assets/images/lifethree.jpg",
    stats: "6 Advanced Labs",
  },
  {
    id: "math",
    title: "Maths",
    description:
      "Modern library with vast collection of books, journals, and digital resources.",
    icon: <Book className="h-10 w-10" />,
    image: "/assets/images/lifefour.jpg",
    stats: "20,000+ Books",
  },
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Various clubs for robotics, coding, debate, environmental awareness, and more.",
    icon: <Users className="h-10 w-10" />,
    image: "/assets/images/lifefive.jpg",
    stats: "12+ Active Clubs",
  },
  {
    id: "language",
    title: "Language Studies",
    description:
      "Spaces for painting, sculpture, and other visual arts to foster creativity.",
    icon: <Palette className="h-10 w-10" />,
    image: "/assets/images/language_studies.jpg",
    stats: "8+ Art Forms",
  },
];

export default function CampusLife() {
  const [hoveredId, setHoveredId] = useState(null);
  const router = useRouter();

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-6">
        {/* Animated heading */}
        <WordPullUp
          words="Campus Life"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-nblue text-center mb-4"
        />

        {/* Animated subheading */}
        <WordFadeIn
          words="Experience a vibrant campus life at Brookfield International School where learning goes beyond classrooms."
          className="max-w-screen-md mx-auto"
        />

        {/* Cards with animations and hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className={`relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 cursor-pointer ${
                hoveredId === activity.id ? "scale-105 shadow-2xl" : ""
              }`}
              onMouseEnter={() => setHoveredId(activity.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() =>
                router.push(
                  activity.id === "sports"
                    ? "/sports"
                    : `/program#${activity.id}`
                )
              }
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.4 }}
            >
              {/* Image with zoom and blur */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                  hoveredId === activity.id
                    ? "scale-110 opacity-100"
                    : "blur-[2px] brightness-50 opacity-100"
                }`}
                style={{
                  backgroundImage: `url(${activity.image})`,
                }}
              ></div>

              {/* Content */}
              <div
                className={`relative p-6 h-full flex flex-col items-center text-center text-white space-y-4 z-10 transition-opacity duration-500 ${
                  hoveredId === activity.id ? "opacity-0" : "opacity-100"
                }`}
              >
                <motion.div
                  className="p-3 rounded-full bg-white bg-opacity-20 transition-transform duration-300"
                  animate={{ scale: hoveredId === activity.id ? 1.2 : 1 }}
                >
                  {activity.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold">{activity.title}</h3>
                <span className="text-sm font-medium bg-white bg-opacity-20 px-4 py-1 rounded-full">
                  {activity.stats}
                </span>
                <p className="text-white text-sm opacity-90">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
