"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import WordFadeIn from "@/components/ui/word-fade-in"; // Adjust path if necessary
import WordPullUp from "@/components/ui/word-pull-up"; // Adjust path if necessary
import ContactForm from "@/components/ContactForm"; // Add this import

export default function ContactUs() {
  const fadeInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen text-gray-800 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {/* Animated Heading */}
          <WordPullUp
            className="text-5xl font-extrabold text-red-600 mb-4"
            words="Get In Touch"
          />
          {/* Animated Description */}
          <WordFadeIn
            className="text-xl text-gray-800 max-w-2xl mx-auto"
            words="Reach out to us for any questions or inquiries. Our team is here to assist you and will respond as soon as possible."
          />
        </motion.div>

        {/* Contact Info and Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            className="bg-[#2196F3] bg-opacity-90 p-10 rounded-lg shadow-xl order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInFromRight}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info Cards */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Address Card */}
            <motion.div
              className="bg-[#ffb800] p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:bg-[#e6a600] transition-colors"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInFromLeft}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3425.9442364188503!2d76.61709347467625!3d30.832228618259553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff17915555555%3A0x742607647b86d7b9!2sBrookfield%20International%20School!5e0!3m2!1sen!2sin!4v1729859443063!5m2!1sen!2sin",
                  "_blank"
                )
              }
            >
              <MapPin className="w-24 h-24 text-white" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-white">
                  Our Address
                </h2>
                <p className="text-gray-200">
                  Sheikhpura New Chandigarh, Kurali-Siswan Road, Dist. S.A.S
                  Nagar, Mohali, Pin: 140110
                </p>
              </div>
            </motion.div>
            {/* Phone Card */}
            <motion.div
              className="bg-[#26A69A] p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:bg-[#219187] transition-colors"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInFromLeft}
              onClick={() => (window.location.href = "tel:+919066790662")}
            >
              <Phone className="w-8 h-8 text-white" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-white">Call Us</h2>
                <p className="text-gray-200">+91-90667 90662</p>
              </div>
            </motion.div>
            {/* Email Card */}
            <motion.div
              className="bg-[#4CAF50] p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:bg-[#449d48] transition-colors"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInFromLeft}
              onClick={() => (window.location.href = "mailto:info@bfis.in")}
            >
              <Mail className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-2xl font-semibold text-white">Email Us</h2>
                <p className="text-gray-200">info@bfis.in</p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              className="mt-12 rounded-lg overflow-hidden shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeIn}
            >
              <iframe
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3425.9442364188503!2d76.61709347467625!3d30.832228618259553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff17915555555%3A0x742607647b86d7b9!2sBrookfield%20International%20School!5e0!3m2!1sen!2sin!4v1729859443063!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
