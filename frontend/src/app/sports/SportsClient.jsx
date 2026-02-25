"use client";

import { motion } from "framer-motion";

const sports = [
  { name: "CRICKET", icon: "/assets/icons/cricket.png" },
  { name: "SPLASH POOL", icon: "/assets/icons/splashPool.png" },
  { name: "FOOTBALL", icon: "/assets/icons/football.png" },
  { name: "SHOOTING", icon: "/assets/icons/shooting.png" },
  { name: "BASKETBALL", icon: "/assets/icons/basketball.png" },
  { name: "ROLLER SKATING", icon: "/assets/icons/rollerSkating.png" },
  { name: "HORSE RIDING", icon: "/assets/icons/horseRiding.png" },
  { name: "YOGA", icon: "/assets/icons/yoga.png" },
  { name: "ATHLETE PROGRAMME", icon: "/assets/icons/athletics.png" },
  { name: "HOCKEY", icon: "/assets/icons/hockey.png" },
];

export default function SportsClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Image */}
      <div className="relative h-[40vh] bg-[url('/assets/images/lifeOne.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">Sports</h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl font-bold text-red-600">
              Sports at Brookfield
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-800 leading-relaxed">
              From playing for fun to aspiring to play for the gold; all our
              students are encouraged to participate in sports activities. We
              believe that sports play a crucial role in the holistic
              development of our students, teaching them valuable life skills
              such as teamwork, discipline, leadership, and resilience.
            </p>
          </motion.div>

          {/* Sports Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          >
            {sports.map((sport, index) => (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors duration-300">
                  <img
                    src={sport.icon}
                    alt={sport.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  {sport.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-red-50 rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-red-800 mb-4">
              State-of-the-Art Facilities
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Our sports infrastructure includes modern playgrounds,
              well-equipped gyms, swimming pools, and specialized coaching
              areas. We provide professional coaching and training programs to
              help students excel in their chosen sports while maintaining
              academic excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
