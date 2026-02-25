import { motion } from "framer-motion";
import WordPullUp from "@/components/ui/word-pull-up";
import WordFadeIn from "@/components/ui/word-fade-in";
import { FaClipboardList, FaPhoneAlt, FaChild } from "react-icons/fa";
import HowToApplyImage from "@/assets/images/one.jpg";
import RequestTourImage from "@/assets/images/two.jpg";
import DayCareImage from "@/assets/images/three.jpg";
import { useNavigate } from "react-router-dom";

function Admission() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "How to apply?",
      content: (
        <>
          <p>
            Start with filling the enquiry form on our website or collect it
            directly from the campus. Submit the registration form with required
            documents, and our admission desk will guide you further.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Registration form charges: Rs. 1000/- (non-refundable).</li>
            <li>Schedule a campus visit by calling our counsellor.</li>
            <li>
              Meeting registration requirements does not guarantee admission.
            </li>
          </ul>
        </>
      ),
      image: HowToApplyImage,
      icon: <FaClipboardList className="text-2xl text-blue-600" />,
      onClick: () => navigate("/contact-us"),
    },
    {
      title: "Request School Private Tour",
      content: (
        <p>Please call us on 9066790662 to schedule a tour of the school!</p>
      ),
      image: RequestTourImage,
      icon: <FaPhoneAlt className="text-2xl text-red-500" />,
      onClick: () => (window.location.href = "tel:9066790662"),
    },
    // {
    //   title: "Day Care & After School",
    //   content: (
    //     <>
    //       <p>
    //         Brookfield offers a safe, engaging day-care environment for children
    //         to socialize and learn.
    //       </p>
    //       <ul className="list-disc list-inside mt-2">
    //         <li>Quality care in a secure and healthy environment.</li>
    //         <li>Opportunities to develop social skills with peers.</li>
    //         <li>Well-trained, caring teachers.</li>
    //         <li>Bedding available for rest and relaxation.</li>
    //       </ul>
    //     </>
    //   ),
    //   image: DayCareImage,
    //   icon: <FaChild className="text-2xl text-green-600" />,
    //   onClick: () => navigate("/contact-us"),
    // },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 md:p-16 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <WordPullUp
            words="Start Your Journey Here"
            className="text-3xl md:text-5xl font-bold text-blue-900 mb-4"
          />
          <p className="text-lg text-gray-700">
            Apply now for exciting programs and shape your future in education.
          </p>
        </motion.div>

        {/* Sections with Enhanced Styling */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={section.onClick}
            className={`flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 p-6 rounded-lg shadow-lg transition transform-gpu hover:scale-[1.03] cursor-pointer ${
              index === 1
                ? "bg-gradient-to-r from-purple-50 to-purple-100"
                : "bg-white"
            }`}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full md:w-1/2 rounded-lg shadow-md"
            />
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">{section.icon}</div>
                <h3 className="text-2xl font-semibold text-blue-800">
                  {section.title}
                </h3>
              </div>
              <div className="text-gray-700 text-base leading-relaxed">
                {section.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Admission;
