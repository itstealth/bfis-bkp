"use client";

import { motion } from "framer-motion";
import WordPullUp from "@/app/components/ui/word-pull-up";
import WordFadeIn from "@/app/components/ui/word-fade-in";
import { FaUsers, FaHandsHelping, FaLightbulb } from "react-icons/fa";
// Public asset path
const teamImage = "/assets/images/webp/world.webp";

export default function AboutValues() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 md:p-16 bg-gradient-to-r from-[#e4eff9] to-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Animated Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <WordPullUp
            words="Values & Ethos"
            className="text-4xl md:text-5xl font-bold text-nblue mb-4"
          />
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="text-left space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <WordFadeIn
            words="Our Vision"
            className="text-2xl font-bold text-nblue lg:text-left"
          />
          <p className="text-gray-700 text-base leading-relaxed">
            BFIS prepares its community to be confident citizens and leaders in
            tomorrow&apos;s world – constantly curious, pioneering, and
            changing.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="text-left space-y-4 mt-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <WordFadeIn
            words="Our Mission"
            className="text-2xl font-bold text-nblue lg:text-left"
          />
          <p className="text-gray-700 text-base leading-relaxed">
            To deliver academic excellence and create inspiring places for
            children and young people to learn and grow into confident
            individuals.
          </p>
        </motion.div>

        {/* Team Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg shadow-lg mt-8"
        >
          <img
            src={teamImage}
            alt="Our Team"
            className="w-full h-64 object-cover"
          />
        </motion.div>

        {/* Core Values Section */}
        <div className="grid gap-8 md:grid-cols-3 mt-12">
          {/* Value 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <FaUsers className="text-nblue text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-vgreen mb-2">
              Community
            </h3>
            <p className="text-gray-700 text-base">
              We foster a sense of belonging and unity, ensuring everyone feels
              valued and respected.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <FaHandsHelping className="text-nblue text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-vgreen mb-2">
              Integrity
            </h3>
            <p className="text-gray-700 text-base">
              We believe in honesty, transparency, and accountability in all our
              actions.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <FaLightbulb className="text-nblue text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-vgreen mb-2">
              Innovation
            </h3>
            <p className="text-gray-700 text-base">
              We encourage creativity and forward-thinking, empowering our
              community to drive change.
            </p>
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-left mt-8"
        >
          <p className="text-gray-700 text-base leading-relaxed">
            At our organization, we believe in fostering a community of respect,
            integrity, and excellence. Our values guide our approach to
            education and inspire our students to become curious, pioneering,
            and compassionate leaders of tomorrow.
          </p>
          <p className="mt-4 text-gray-700 text-base leading-relaxed">
            Through dedication to academic excellence and a commitment to social
            responsibility, we aim to create an environment where everyone can
            grow and achieve their fullest potential.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
