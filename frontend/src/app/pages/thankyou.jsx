"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, Home } from "lucide-react"; // Removed Share2 import
import { motion } from "framer-motion";
import { ConfettiSideCannons } from "@/components/magicui/confetti"; // Import the ConfettiSideCannons component

function ThankYou() {
  const confettiRef = useRef(null);

  useEffect(() => {
    // Trigger the side cannon effect when the component mounts
    if (
      confettiRef.current &&
      typeof confettiRef.current.handleClick === "function"
    ) {
      confettiRef.current.handleClick(); // Call the handleClick method to trigger confetti
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 flex items-center justify-center p-4 relative">
      <ConfettiSideCannons ref={confettiRef} />{" "}
      {/* Render the ConfettiSideCannons component */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg p-8 backdrop-blur-sm bg-white/80 shadow-xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <ThumbsUp className="w-16 h-16 text-rose-500" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-teal-500 text-transparent bg-clip-text">
              Thank You!
            </h1>

            <p className="text-gray-600 text-lg">
              Thank you for contacting us! We will get back to you soon.
            </p>

            <div className="flex justify-center mt-8">
              {/* Center the button */}
              <Button
                variant="outline"
                className="w-full max-w-xs group bg-rose-500 text-white hover:bg-rose-800 hover:text-white transition-all" // Made button wider
                onClick={() => (window.location.href = "/")}
              >
                <Home className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Return Home
              </Button>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}

export default ThankYou;
