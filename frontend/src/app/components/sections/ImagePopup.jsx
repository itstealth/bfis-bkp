"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { X } from "lucide-react";

const ImagePopup = ({ isOpen, setIsOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
            className="relative w-[90vw] max-w-[500px] z-[201]"
          >
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -right-2 -top-2 p-1.5 bg-white hover:bg-gray-200 rounded-full text-gray-800 shadow-lg"
                aria-label="Close image popup"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <Link href="/contact-us" onClick={() => setIsOpen(false)}>
                <Image
                  src="/assets/bfis_popup.png"
                  alt="BFIS School Admission Open"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-2xl w-full h-auto"
                  priority
                />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImagePopup;
