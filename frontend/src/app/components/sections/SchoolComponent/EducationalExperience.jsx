"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

import dynamic from "next/dynamic";

// Lazy-load animation components for better performance:
const WordPullUp = dynamic(() => import("@/app/components/ui/word-pull-up"), {
  ssr: false,
});
const WordFadeIn = dynamic(() => import("@/app/components/ui/word-fade-in"), {
  ssr: false,
});

export default function EducationalExperience() {
  const router = useRouter();

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const image4Ref = useRef(null);
  const image5Ref = useRef(null);
  const image6Ref = useRef(null);

  const isImage1InView = useInView(image1Ref, { triggerOnce: false });
  const isImage2InView = useInView(image2Ref, { triggerOnce: false });
  const isImage3InView = useInView(image3Ref, { triggerOnce: false });
  const isImage4InView = useInView(image4Ref, { triggerOnce: false });
  const isImage5InView = useInView(image5Ref, { triggerOnce: false });
  const isImage6InView = useInView(image6Ref, { triggerOnce: false });

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 overflow-hidden">
      {/* Heading Section with Animations */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-nblue font-roboto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Diverse Experience at BFIS
        </motion.h1>
        <WordFadeIn words="Discover a world of opportunities where academic excellence meets holistic development" />
      </div>

      <div className="grid lg:grid-cols-3 gap-0 md:grid-cols-1">
        {/* Left Side */}
        <div className="col-span-1 text-center md:mb-8">
          {/* Academics */}
          <motion.div
            ref={image1Ref}
            initial={{ x: "-100%", y: "-100%", opacity: 0 }}
            animate={isImage1InView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.2,
            }}
          >
            <ImageSection
              title="Academics"
            color="bg-nblue"
              className="rounded-lg lg:rounded-none lg:rounded-tl-lg"
              imageSrc="/assets/images/academics.jpg"
              onClick={() => router.push("/academics")}
            />
          </motion.div>
          <TriangleConnector direction="left" className="hidden lg:block" />

          {/* Student Life */}
          <motion.div
            ref={image2Ref}
            initial={{ x: "-100%", opacity: 0 }}
            animate={isImage2InView ? { x: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
          >
            <ImageSection
              title="Student Life"
            color="bg-vgreen"
              className="lg:rounded-none rounded-lg"
              imageSrc="/assets/images/studentLife.jpg"
              onClick={() => router.push("/events")}
            />
          </motion.div>
          <TriangleConnector direction="left" className="hidden lg:block" />

          {/* Achievements */}
          <motion.div
            ref={image3Ref}
            initial={{ x: "-100%", y: "100%", opacity: 0 }}
            animate={isImage3InView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.4,
            }}
          >
            <ImageSection
              title="Achievements"
            color="bg-nblue"
              className="rounded-lg lg:rounded-none lg:rounded-bl-lg"
              imageSrc="/assets/images/achieve.jpg"
              onClick={() => {
                const el = document.getElementById("achievements");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </motion.div>
        </div>

        {/* Center Text */}
        <div className="col-span-1 flex flex-col justify-center items-center text-center text-white text-montserrat px-6 bg-nblue md:mt-8 md:mb-8 lg:mt-0 mb-4 pb-4 pt-3">
          <h2 className="text-2xl font-semibold mb-4">
            One Way.
            <br />
            Our Methods.
            <br />
            Our Difference.
          </h2>
          <h3 className="text-xl font-medium mb-2">
            Holistic Education at BFIS
          </h3>
          <p className="text-sm mb-4">
            Adding that holistic perspective of the child as the core essence of
            our academic system, we provide a comprehensive learning experience
            through Academics, Events, Facilities, and more.
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-vgreen hover:bg-hgreen text-white rounded font-bold transition-colors duration-300"
            onClick={() => router.push("/academics")}
          >
            Learn More
          </button>
        </div>

        {/* Right Side */}
        <div className="col-span-1 text-center">
          {/* Extracurricular */}
          <motion.div
            ref={image4Ref}
            initial={{ x: "100%", y: "-100%", opacity: 0 }}
            animate={isImage4InView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.2,
            }}
          >
            <ImageSection
              title="Extracurricular"
            color="bg-vgreen"
              className="rounded-lg lg:rounded-none lg:rounded-tr-lg"
              imageSrc="/assets/images/extra.jpg"
              onClick={() => router.push("/events")}
            />
          </motion.div>
          <TriangleConnector direction="right" className="hidden lg:block" />

          {/* Facilities */}
          <motion.div
            ref={image5Ref}
            initial={{ x: "100%", opacity: 0 }}
            animate={isImage5InView ? { x: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
          >
            <ImageSection
              title="Facilities"
            color="bg-nblue"
              className="rounded-lg lg:rounded-none"
              imageSrc="/assets/images/facility.jpg"
              onClick={() => router.push("/glimpse")}
            />
          </motion.div>
          <TriangleConnector direction="right" className="hidden lg:block" />

          {/* Events */}
          <motion.div
            ref={image6Ref}
            initial={{ x: "100%", y: "100%", opacity: 0 }}
            animate={isImage6InView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.4,
            }}
          >
            <ImageSection
              title="Events"
            color="bg-vgreen"
              className="rounded-lg lg:rounded-none lg:rounded-br-lg"
              imageSrc="/assets/images/event.jpg"
              onClick={() => router.push("/events")}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ImageSection({ title, color, imageSrc, className, onClick }) {
  return (
    <div
      className={`relative h-60 overflow-hidden mb-4 md:mb-0 ${className} cursor-pointer`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Navigate to ${title} page`}
      // Prevent event propagation if needed
      // onFocus/onBlur can be added if you want more UI cues
    >
      <div className="relative h-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>
      <div className={`absolute bottom-0 left-0 right-0 ${color} p-2`}>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}

function TriangleConnector({ direction, className }) {
  return (
    <div
      className={`relative w-full ${
        direction === "left" ? "ml-auto" : "mr-auto"
      } ${className}`}
    >
      <div
        className={`absolute bg-nblue ${
          direction === "left" ? "right-0" : "left-0"
        } w-10 h-10 z-10 mt-[-1.20rem]`}
        style={{
          clipPath:
            direction === "left"
              ? "polygon(100% 0, 0 50%, 100% 100%)"
              : "polygon(100% 50%, 0 0, 0 100%)",
          WebkitClipPath:
            direction === "left"
              ? "polygon(100% 0, 0 50%, 100% 100%)"
              : "polygon(100% 50%, 0 0, 0 100%)",
        }}
      />
    </div>
  );
}
