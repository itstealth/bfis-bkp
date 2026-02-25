import { motion } from "framer-motion";
import Cricket from "../assets/icons/cricket.png";
import SplashPool from "../assets/icons/splashPool.png";
import Football from "../assets/icons/football.png";
import rollerSkating from "../assets/icons/rollerSkating.png";
import Shooting from "../assets/icons/shooting.png";
import Basketball from "../assets/icons/basketball.png";
import HorseRiding from "../assets/icons/horseRiding.png";
import Yoga from "../assets/icons/yoga.png";
import Athlete from "../assets/icons/athletics.png";
import Hockey from "../assets/icons/hockey.png";

const sports = [
  { name: "CRICKET", icon: Cricket },
  { name: "SPLASH POOL", icon: SplashPool },
  { name: "FOOTBALL", icon: Football },
  { name: "SHOOTING", icon: Shooting },
  { name: "BASKETBALL", icon: Basketball },
  { name: "ROLLER SKATING", icon: rollerSkating },
  { name: "HORSE RIDING", icon: HorseRiding },
  { name: "YOGA", icon: Yoga },
  { name: "ATHLETE PROGRAMME", icon: Athlete },
  { name: "HOCKEY", icon: Hockey },
];

const SportsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Image */}
      <div className="relative h-[40vh] bg-[url('/src/assets/images/lifeOne.jpg')] bg-cover bg-center">
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
              students experience a broad range of sports in exceptional
              facilities.{" "}
              <span className="text-orange-500 font-medium">
                We are driven by values, not results. We know that if you get
                your culture right, the results will follow.
              </span>{" "}
              Our coaches and trainers are professional athletes and understand
              what it takes to perform at the highest level. They assist
              students at all levels to advance their abilities, as well as
              nurturing elite performers through focused training programmes –
              giving them every opportunity to excel. For students who wish to
              compete in their chosen sports, there are ample opportunities to
              represent Brookfield.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sports Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-16 text-gray-800"
          >
            List of Sports Offered
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sports.map((sport, index) => (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">
                  <img
                    src={sport.icon}
                    alt={sport.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p
                  className="text-sm font-medium text-center uppercase"
                  style={{ color: "#8B7355" }}
                >
                  {sport.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsPage;
