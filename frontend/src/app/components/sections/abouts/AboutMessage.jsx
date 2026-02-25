"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import WordPullUp from "@/app/components/ui/word-pull-up";
import WordFadeIn from "@/app/components/ui/word-fade-in";
// Public asset paths
const president = "/assets/bfis_images/President-BFIS.jpg";
const principal = "/assets/bfis_images/Principal-BFIS.jpg";

export default function AboutMessage() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    });
  }, [controls]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="bg-white py-6 sm:py-8 md:py-4">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 space-y-16">
          {/* Main Heading */}
          <motion.h2
            className="text-center text-4xl sm:text-5xl md:text-6xl font-bold my-8 text-nblue font-roboto"
            initial={{ x: -100, opacity: 0 }}
            animate={controls}
          >
            <WordPullUp
              words="Leadership Message"
              className="text-center text-4xl sm:text-5xl md:text-6xl font-bold my-8 text-nblue font-roboto"
            />
          </motion.h2>

          {/* President's Message Section */}
          <div>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-800 font-montserrat mb-16 text-center"
              initial={{ x: -100, opacity: 0 }}
              animate={controls}
            >
              <WordFadeIn
                words="President's Message"
                className="text-2xl sm:text-3xl font-bold font-montserrat text-gray-800 mb-16 text-center"
              />
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {/* Left Side: Sticky Image */}
              <motion.div
                className="md:sticky md:top-20 self-start"
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
              >
                <div className="h-64 md:h-auto overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                  <img
                    src={president}
                    loading="lazy"
                    alt="Brookfield International School President"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </motion.div>

              {/* Right Side: Content */}
              <motion.div
                className="space-y-6 md:space-y-4"
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
              >
                <p className="text-center md:text-left font-bold text-vgreen font-montserrat">
                  Who we are
                </p>
                <h3 className="text-center md:text-left text-xl sm:text-2xl font-bold text-gray-800 font-montserrat">
                  Brookfield International School
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-justify">
                  Brookfield International School is a CBSE Affiliated
                  Co-educational Senior Secondary School, established in 2020
                  under the patronage of the Indo Global Education Society,
                  which was established in 2003. Today, the society operates 4
                  colleges with over 10,000 alumni. With Brookfield, we look
                  forward into the twenty-first century with imagination and
                  confidence, placing the value of an all-round education, in
                  which each individual and their talents come first, at the
                  forefront of our mission.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-justify">
                  Our community values people. We are warm, compassionate, and
                  mutually supportive. Here, generosity of spirit and respect
                  matter. We take time to enjoy life, appreciating each student
                  in all their diversity for who they are. Supported by staff
                  who truly care, our students shape the community and make
                  Brookfield the rich and happy place it is.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-justify">
                  Intellectual rigour, exploration, critical analysis,
                  creativity, risk-taking, communication, teamwork – all are
                  central to the way we guide, nurture, and inspire our young
                  people. Our role is to equip them with the skills, confidence,
                  and capabilities to navigate their own paths through life, and
                  the unshakeable sense of self they need to influence the world
                  for the better.
                </p>
                <p className="text-right font-bold text-gray-800 text-sm sm:text-base">
                  - Manav Singla
                </p>
              </motion.div>
            </div>
          </div>

          {/* Principal's Message Section */}
          <div>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-16 text-center font-roboto"
              initial={{ x: -100, opacity: 0 }}
              animate={controls}
            >
              <WordFadeIn
                words="Principal's Message"
                className="text-2xl sm:text-3xl font-bold text-gray-800 font-roboto mb-16 text-center"
              />
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {/* Left Side: Image on Mobile */}
              <motion.div
                className="self-start block md:hidden"
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
              >
                <div className="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                  <img
                    src={principal}
                    loading="lazy"
                    alt="Principal of Brookfield International School"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </motion.div>

              {/* Right Side: Content */}
              <motion.div
                className="space-y-6 md:space-y-4"
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
              >
                <p className="text-center md:text-left font-bold text-vgreen font-montserrat">
                  Message From The Principal
                </p>
                <h3 className="text-center md:text-left text-xl sm:text-2xl font-bold font-montserrat text-gray-800">
                  Dear Parents,
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-justify font-montserrat">
                  Welcome to Brookfield International School. We firmly believe
                  that: “Education is not merely the amount of information that
                  is put into the brain. Education should form the character,
                  intellect of mind, and enable students to stand on their own
                  feet.” We know that the future of our children is one of
                  incessant striving and stiff competition. Our emphasis is on
                  imparting education that enables character building and
                  &#34;man making&#34; as envisioned by Swami Vivekananda.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-justify">
                  Education at our school is a blend of values, culture, and
                  conventional learning. We offer top-notch facilities to ensure
                  the holistic development of each child and foster 21st-century
                  skills like collaboration, digital literacy, critical
                  thinking, and problem-solving. Our classrooms are equipped
                  with world-class technological facilities that make learning a
                  superior experience.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-justify">
                  Our dedicated team of leaders, administrators, academic
                  planners, and proficient teachers strive to meet the
                  aspirations of parents who have entrusted their children to
                  us. Together, we aim to nurture educated, confident, and
                  resilient citizens who are committed to contributing to the
                  progress of our country.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-justify">
                  We look forward to working hand in hand with you to provide
                  the highest-quality education for your children.
                </p>
                <p className="text-right font-bold text-gray-800 text-sm sm:text-base">
                  - Vandana Bansal
                </p>
              </motion.div>

              {/* Image for Desktop Only */}
              <motion.div
                className="hidden md:block md:sticky md:top-8 self-start"
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
              >
                <div className="h-auto overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                  <img
                    src={principal}
                    loading="lazy"
                    alt="Principal of Brookfield International School"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
