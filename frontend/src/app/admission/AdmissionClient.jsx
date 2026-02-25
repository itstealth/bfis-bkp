"use client";

import { motion } from "framer-motion";
import { FaClipboardList, FaPhoneAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdmissionClient() {
  const router = useRouter();

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
      image: "/assets/images/one.jpg",
      icon: <FaClipboardList className="text-2xl text-nblue" />,
      onClick: () => router.push("/contact-us"),
    },
    {
      title: "Request School Private Tour",
      content: (
        <p>Please call us on 9066790662 to schedule a tour of the school!</p>
      ),
      image: "/assets/images/two.jpg",
      icon: <FaPhoneAlt className="text-2xl text-vgreen" />,
      onClick: () => (window.location.href = "tel:9066790662"),
    },
    // If you re-enable Day Care, keep the same design and update paths
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
    //   image: "/assets/images/three.jpg",
    //   icon: <FaChild className="text-2xl text-green-600" />,
    //   onClick: () => router.push("/contact-us"),
    // },
  ];

  return (
    <div className="bg-gradient-to-r from-[#e4eff9] to-white p-8 md:p-16 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-nblue mb-4"
          >
            Start Your Journey Here
          </motion.h1>
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
                ? "bg-gradient-to-r from-[#e4eff9] to-[#e6f7ee]"
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
                <h3 className="text-2xl font-semibold text-nblue">
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
