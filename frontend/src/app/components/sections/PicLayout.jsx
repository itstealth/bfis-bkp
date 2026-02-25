"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FaLeaf, FaBook, FaChalkboardTeacher } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function PicLayout() {
  // Reference for the content container (triggers animation)
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });
  const router = useRouter();

  return (
    <div className="flex justify-center items-center container max-w-screen-2xl">
      <div className="bg-nblue p-6 md:p-12 flex flex-col md:flex-row items-center text-center md:text-left rounded-lg shadow-xl py-6 md:py-16 max-w-screen-xl w-full">
        {/* Hero Image Section (Fade In) */}
        <motion.div
          className="md:w-1/2 mb-6 md:mb-0 relative h-64 md:h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isContentInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/assets/images/class_t.jpg" // Public folder path!
            alt="Inspiring learning environment"
            fill
            priority
            className="object-cover rounded-lg shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Content Section */}
        <div
          ref={contentRef}
          className="md:w-1/2 md:pl-12 text-white space-y-6"
        >
          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-5xl font-bold font-roboto"
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why Brookfield?
          </motion.h2>

          {/* Key Points with Icons */}
          <motion.div
            className="space-y-4 text-sm md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3">
              <FaLeaf className="text-white text-2xl" />
              <span>Personalized Education for Every Child</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaBook className="text-white text-2xl" />
              <span>Comprehensive Curriculum &amp; Beyond</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="text-white text-2xl" />
              <span>Guidance from Experienced Educators</span>
            </div>
          </motion.div>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              type="button"
              onClick={() => router.push("/program")}
              className="inline-block bg-vgreen text-white py-3 px-6 rounded-full font-semibold hover:bg-hgreen transition-colors duration-200"
            >
              Learn More About Our Programs
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
