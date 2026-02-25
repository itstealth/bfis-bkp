"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import KritiBora from "../assets/images/kritibora.webp";

const benefits = [
  {
    title: "Innovative Environment",
    description: "Be at the forefront of educational excellence",
  },
  {
    title: "Professional Growth",
    description: "Continuous learning and development opportunities",
  },
  {
    title: "Work-Life Harmony",
    description: "Flexible schedules to support your lifestyle",
  },
  {
    title: "Impactful Work",
    description: "Shape the future through education",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
};

const blockquoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } },
};

export default function WorkWithUs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#26A69A]/5 to-[#9C27B0]/5 flex items-center justify-center md:p-8">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-md md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Section */}
          <div className="p-6 md:p-12 space-y-8">
            {/* Animated Heading */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold md:font-extrabold text-[#2196F3] leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Join Our <br />
              <span className="text-[#4CAF50]">Visionary Team</span>
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Embark on a journey of excellence and innovation. Your expertise
              could shape the future of education.
            </motion.p>
            {/* Benefits Section */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start space-x-3 cursor-pointer transition-opacity ${
                    activeIndex === index ? "opacity-100" : "opacity-50"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Star
                    className={`w-6 h-6 ${
                      activeIndex === index
                        ? "text-[#FFB800]"
                        : "text-[#FFD966]"
                    } mt-1 transition-colors`}
                  />
                  <div>
                    <h3
                      className={`font-semibold transition-colors ${
                        activeIndex === index
                          ? "text-[#4CAF50]"
                          : "text-gray-600"
                      }`}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Button */}
            <motion.button
              className="bg-[#2196F3] hover:bg-[#1E88E5] text-white px-4 md:px-8 py-4 md:py-4 text-sm md:text-lg rounded-full transition-transform duration-300"
              onClick={() => navigate("/contact-us")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Opportunities
              <ChevronRight className="ml-2 h-5 w-5 inline" />
            </motion.button>
          </div>
          {/* Right Section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#26A69A] to-[#9C27B0] opacity-70"></div>
            <motion.img
              src={KritiBora}
              alt="Collaborative work environment"
              className="object-cover w-full h-full"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            />
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <motion.blockquote
                className="text-2xl font-light italic mb-4"
                variants={blockquoteVariants}
                initial="hidden"
                animate="visible"
              >
                "Joining this team was the best decision of my career. The
                support and growth opportunities are unparalleled."
              </motion.blockquote>
              <motion.p
                className="font-semibold"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                - Kritika Bora, Asst Educator
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
