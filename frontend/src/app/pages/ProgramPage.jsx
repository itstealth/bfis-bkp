import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Arts from "../assets/images/Arts.jpg";
import Sciences from "../assets/images/Sciences.jpg";
import Maths from "../assets/images/Maths.jpg";
import Robotics from "../assets/images/Robotics.jpg";
import LanguageStudies from "../assets/images/language_studies.jpg";

export const subjects = [
  {
    id: "arts",
    title: "Arts",
    description:
      "Experimentation and risk-taking are absolutely fundamental to creative exploration at Brookfield. In the open and welcoming environment of our campus, we urge pupils to flex their creativity without limitation.",
    highlight:
      "The creative sector is one of the fastest growing sectors not only in India but across the World",
    image: Arts,
    bgColor: "#FFB800",
    animationDirection: "left",
    fullDescription: `Experimentation and risk-taking are absolutely fundamental to creative exploration at Brookfield. In the open and welcoming environment of our campus, we urge pupils to flex their creativity without limitation.

    We recognise the significance of the creative disciplines in all aspects of pupils' lives – at school and beyond. Most importantly, we want creativity to be fun – to bring joy to our pupils' lives; we want them to delight in expressing their ideas and imagination with passion and confidence. On a practical level, the creative disciplines open doors to so many careers.

    The creative sector is one of the fastest growing sectors not only in India but across the World and we would like to see our students take their rightful place with the next generation of designers and artists.

    Key Features:
    • Professional art studios and theater spaces
    • Regular art exhibitions and performances
    • Artist-in-residence programs
    • Integration with other subjects
    • Field trips to museums and galleries`,
    meta: {
      title: "Explore Arts Programs at BFIS – Comprehensive Curriculum",
      description:
        "Discover the Arts programs at BFIS with a well-rounded curriculum, expert faculty, and a focus on creativity and critical thinking for students.",
    },
  },
  {
    id: "science",
    title: "Sciences",
    description:
      "Science is a core subject from the minute students arrive at Brookfield. Biology, Chemistry and Physics make up a significant proportion of their studies in the middle school.",
    highlight:
      "Foster a spirit of experimentation and inquiry that is akin to university study",
    image: Sciences,
    bgColor: "#26A69A",
    animationDirection: "right",
    fullDescription: `Science is a core subject from the minute students arrive at Brookfield. Biology, Chemistry and Physics make up a significant proportion of their studies in the middle school. Students work in first-rate laboratories, and are encouraged to foster a spirit of experimentation and inquiry that is akin to university study. As a result, they are well placed to apply for a Science undergraduate course across all universities around the world.

    Key Features:
    • Modern science laboratories
    • Research opportunities
    • Science fairs and competitions
    • Environmental projects
    • Collaboration with universities
    • Hands-on experimental learning
    • Advanced equipment and facilities`,
    meta: {
      title: "Explore Science Programs at BFIS – Empowering Young Minds",
      description:
        "Discover exceptional science programs at BFIS. Foster critical thinking, innovation, and academic excellence for future scientists and innovators.",
    },
  },
  {
    id: "math",
    title: "Mathematics",
    description:
      "Our specially curated math curriculum gives students a deeper understanding and greater confidence of mathematical concepts – mastery of these concepts has become essential in the world we live in.",
    highlight:
      "Computational Thinking, Logic, Probability and Statistics will play a significant role in the years to come",
    image: Maths,
    bgColor: "#4CAF50",
    animationDirection: "left",
    fullDescription: `Our specially curated math curriculum gives students a deeper understanding and greater confidence of mathematical concepts – mastery of these concepts has become essential in the world we live in. Computational Thinking, Logic, Probability and Statistics will play a significant role in the years to come and hence we at Brookfield focus on giving a strong foundation program to all our students so they can go and take up a course of their choice once they graduate from Brookfield.

    Our classes are engaging, where mathematical concepts are explored using open-ended activities with multiple entry and exit points. This type of learning focuses on developing critical thinking and reasoning skills and encourages students to think like mathematicians with no assessment involved.

    Key Features:
    • Advanced math courses
    • Math competitions and olympiads
    • One-on-one tutoring
    • Real-world applications
    • Integration with technology
    • Focus on computational thinking
    • Emphasis on logical reasoning`,
    meta: {
      title: "Best Math Program for Students | BFIS",
      description:
        "Explore the best Math program at BFIS, designed to enhance analytical thinking and problem-solving skills for students. Enroll today to excel in mathematics!",
    },
  },
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Our robotics curriculum introduces students to automation, IOT, AI & VR for the future. The rate at which technology is advancing, robotics is fast becoming a main field subject and has tremendous potential to grow.",
    highlight:
      "Robotics connect math and science beautifully and shows practical applications of many concepts",
    image: Robotics,
    bgColor: "#2196F3",
    animationDirection: "right",
    fullDescription: `Our robotics curriculum introduces students to automation, IOT, AI & VR for the future. The rate at which technology is advancing, robotics is fast becoming a main field subject and has tremendous potential to grow. Our curriculum not only introduces our students to the vast field of robotics but also encourages them to think creatively and get hands-on experience by working on projects.

    Robotics connect math and science beautifully and shows practical applications of many concepts learned during the classes.

    Key Features:
    • Robotics lab with latest equipment
    • Programming courses
    • Robotics competitions
    • Industry partnerships
    • Innovation projects
    • Hands-on project experience
    • IOT and automation focus`,
    meta: {
      title: "Robotics Program at BFIS | Advanced Technology Courses",
      description:
        "Join the Robotics program at BFIS and explore cutting-edge technology. Gain hands-on experience and enhance your skills in automation and robotics.",
    },
  },
  {
    id: "language",
    title: "Language Studies",
    description:
      "Many of our pupils already speak enough English to access our curriculum, but for those who cannot we provide support both within the mainstream classroom and in separate specialist classes as necessary.",
    highlight:
      "Being an international school – we give importance to other languages spoken around the world",
    languages: ["French"],
    image: LanguageStudies,
    bgColor: "#9C27B0",
    animationDirection: "left",
    fullDescription: `Many of our pupils already speak enough English to access our curriculum, but for those who cannot we provide support both within the mainstream classroom and in separate specialist classes as necessary. Our staff are extremely experienced in welcoming children and parents from all backgrounds who may only be used to talking in their mother tongue.

    Being an international school – we give importance to other languages spoken around the world and our students have the option to pick up an optional regional or international language. The school is introducing classes in`,
    meta: {
      title:
        "Language Program | B.F.I.S - Empowering Through Language Education",
      description:
        "Explore B.F.I.S Language Program to enhance communication skills and unlock new opportunities in a globalized world. Join us today!",
    },
  },
];

const animationVariants = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
  visible: { opacity: 1, x: 0 },
});

const ProgramPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subjectRefs = useRef({});

  // Get the current subject ID from the URL hash
  const currentId = location.hash.replace("#", ""); // Remove the '#' from the hash

  // Find the current subject based on the URL hash
  const currentSubject =
    subjects.find((subject) => subject.id === currentId) || subjects[0];

  useEffect(() => {
    if (currentSubject && subjectRefs.current[currentSubject.id]) {
      const scrollTimeout = setTimeout(() => {
        subjectRefs.current[currentSubject.id].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
      return () => clearTimeout(scrollTimeout);
    }
  }, [currentId, currentSubject]);

  const handleProgramClick = (subject) => {
    navigate(`/program/${subject.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 md:py-16">
      <div className="w-[90%] mx-auto md:max-w-7xl grid gap-6 md:gap-12">
        {subjects.map((subject) => (
          <motion.div
            key={subject.id}
            ref={(el) => (subjectRefs.current[subject.id] = el)}
            id={subject.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={animationVariants(subject.animationDirection)}
            transition={{ duration: 0.8 }}
            className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer"
            style={{ backgroundColor: subject.bgColor }}
            onClick={() => handleProgramClick(subject)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="aspect-square md:aspect-auto rounded-lg overflow-hidden shadow-lg transition-transform duration-300"
              >
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              <div className="text-center md:text-left">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={animationVariants(subject.animationDirection)}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-white"
                >
                  {subject.title}
                </motion.h2>
                <p className="text-white mt-4">{subject.description}</p>
                {subject.highlight && (
                  <p className="text-gray-200 font-semibold mt-4">
                    {subject.highlight}
                  </p>
                )}
                {subject.languages && (
                  <div className="flex justify-center md:justify-start flex-wrap gap-3 mt-4">
                    {subject.languages.map((lang) => (
                      <button
                        key={lang}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-100 hover:from-blue-400 hover:to-blue-600 hover:text-white font-medium shadow"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgramPage;
