/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaGlobe, FaAward, FaChalkboardTeacher } from "react-icons/fa";
import { useRouter } from "next/navigation";
// Public asset paths
const campusImage = "/assets/images/one.jpg";
const internationalImage = "/assets/images/two.jpg";
const awardsImage = "/assets/images/three.jpg";
const digitalClassroomImage = "/assets/images/four.jpg";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import WordPullUp from "@/app/components/ui/word-pull-up";
import WordFadeIn from "@/app/components/ui/word-fade-in";

export default function AboutSetUsApart() {
  const router = useRouter();

  const counters = [
    { id: 1, label: "Students", value: 1800 },
    { id: 2, label: "Faculty", value: 150 },
    { id: 3, label: "Acres Campus", value: 7 },
  ];

  const counterDuration = 2; // Duration for counters to complete in seconds

  const Counter = ({ endValue, label }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      const currentRef = counterRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        },
        { threshold: 0.5 }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, []);

    useEffect(() => {
      if (!isInView) return;

      let currentCount = 0;
      const increment = endValue / (counterDuration * 60);
      const interval = setInterval(() => {
        currentCount += increment;
        setCount(Math.min(Math.round(currentCount), endValue));
        if (currentCount >= endValue) clearInterval(interval);
      }, 1000 / 60);

      return () => clearInterval(interval);
    }, [isInView, endValue]);

    return (
      <div ref={counterRef} className="flex flex-col items-center text-center">
        <motion.h3 className="text-4xl font-bold text-nblue">
          <span className="block">{count}+</span>
        </motion.h3>
        <p className="text-lg text-gray-600">{label}</p>
      </div>
    );
  };

  Counter.propTypes = {
    endValue: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  };

  const AnimatedSection = ({ children }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      const currentRef = ref.current;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        },
        { threshold: 0.5 }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, []);

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    );
  };

  // Testimonial Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[50vh]"
        style={{ backgroundImage: `url(${campusImage})` }}
      >
        <div className="absolute inset-0 bg-nblue/80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-2">
          <WordPullUp
            words="What Sets Us Apart"
            className="text-3xl md:text-4xl font-bold text-white"
          />
          <WordFadeIn
            words="Brookfield International School - A CBSE Affiliated Leader in Education"
            className="text-white mt-2 text-xl"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#eef5fb]">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          {counters.map((counter, index) => (
            <div
              key={counter.id}
              className={`flex flex-col items-center text-center ${
                index === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <Counter endValue={counter.value} label={counter.label} />
            </div>
          ))}
        </div>
      </section>

      {/* Unique Features Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid gap-12 md:grid-cols-2 items-center">
          {/* Feature: Global Exposure */}
          <AnimatedSection>
            <div className="flex flex-col items-start text-left space-y-6">
              <FaGlobe className="text-5xl text-nblue" />
              <h2 className="text-2xl font-bold text-nblue">
                Global Exposure
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We prepare our students to be global citizens with exchange
                programs, international interactions, and events featuring
                foreign dignitaries.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <img
              src={internationalImage}
              alt="Global Exposure"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </AnimatedSection>

          {/* Feature: Award-Winning */}
          <AnimatedSection>
            <img
              src={awardsImage}
              alt="Award-Winning"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-col items-start text-left space-y-6">
              <FaAward className="text-5xl text-nblue" />
              <h2 className="text-2xl font-bold text-nblue">
                Award-Winning
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Rated as the top emerging school in the tri-city by Times School
                Survey in 2020 &amp; 2021, and holder of a world record with
                World Book of Records, UK.
              </p>
            </div>
          </AnimatedSection>

          {/* Feature: Digital Classrooms */}
          <AnimatedSection>
            <div className="flex flex-col items-start text-left space-y-6">
              <FaChalkboardTeacher className="text-5xl text-nblue" />
              <h2 className="text-2xl font-bold text-nblue">
                Digital Classrooms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Brookfield is equipped with award-winning interactive software
                to enhance student engagement in both online and in-class
                learning.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <img
              src={digitalClassroomImage}
              alt="Digital Classrooms"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-[#e4eff9] to-white text-center">
        <h2 className="text-3xl font-bold text-nblue mb-8">
          What Our Community Says
        </h2>
        <div className="container mx-auto px-4">
          <Slider {...sliderSettings}>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700">
                &quot;Brookfield's approach has helped my child excel
                academically and socially!&quot;
              </p>
              <p className="mt-4 text-nblue font-semibold">
                - Parent of a Student
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700">
                &quot;Being part of Brookfield&apos;s diverse community has
                broadened my perspectives.&quot;
              </p>
              <p className="mt-4 text-nblue font-semibold">- Alumni</p>
            </div>
          </Slider>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-nblue text-center text-white">
        <h2 className="text-4xl font-bold">Ready to Join Brookfield?</h2>
        <p className="mt-4 text-lg">
          Contact us to learn more about enrollment opportunities!
        </p>
        <button
          onClick={() => router.push("/contact-us")}
          className="mt-8 px-8 py-3 bg-vgreen hover:bg-hgreen rounded-full font-bold"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
}
