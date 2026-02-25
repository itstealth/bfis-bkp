"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WordPullUp from "@/app/components/ui/word-pull-up";
import {
  User,
  ShieldAlert,
  Clock,
  IndianRupee,
  FileText,
  Briefcase,
  AlertCircle,
  Info,
  BookOpen,
  AlertTriangle,
  Star,
  Download,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

const policies = [
  {
    text: "It is compulsory for each student to come in proper school uniform, failing which they will be fined",
    icon: <User className="icon" />,
  },
  {
    text: "If any child or parent misbehaves with any teaching or non-teaching staff, the management has full rights to take action",
    icon: <ShieldAlert className="icon" />,
  },
  {
    text: "Any kind of cheating, irregular attendance, and misconduct even outside the school premises by the child is liable for dismissal",
    icon: <AlertCircle className="icon" />,
  },
  {
    text: "Tuition fee and transport fee should be submitted on time",
    icon: <IndianRupee className="icon" />,
  },
  {
    text: "If the dues of any child are not cleared, he/she will not be allowed to sit in the exam",
    icon: <FileText className="icon" />,
  },
  {
    text: "A student should attend the school regularly and must reach on time",
    icon: <Clock className="icon" />,
  },
  {
    text: "Parents are not allowed to meet the teachers during school hours without prior appointment",
    icon: <Briefcase className="icon" />,
  },
  {
    text: "Students will be responsible for any damage to school property",
    icon: <AlertTriangle className="icon" />,
  },
  {
    text: "The school does not take any responsibility for the loss of personal belongings",
    icon: <Info className="icon" />,
  },
  {
    text: "Students are not allowed to bring mobile phones, cameras, or any other electronic gadgets to school",
    icon: <BookOpen className="icon" />,
  },
  {
    text: "The school reserves the right to change any rule or policy as and when required",
    icon: <Star className="icon" />,
  },
];

function ConsentCard() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-vgreen/10 rounded-full flex items-center justify-center text-vgreen">
          <MessageCircle className="w-6 h-6" />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center">
            <p className="text-gray-700 font-medium flex items-center">
              <span className="inline-flex items-center whitespace-nowrap">
                Notification and <br /> Communication Consent
                <motion.span
                  className="inline-flex items-center ml-[5px]"
                    animate={{ rotate: open ? 180 : 0, y: "1rem" }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.span>
              </span>
            </p>
          </div>

          <AnimatePresence>
            {open && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mt-3 text-sm text-gray-600 leading-relaxed overflow-hidden"
              >
                By accepting this policy, you acknowledge and consent to
                receiving notifications and promotional communications from us
                through email, mobile push notifications, SMS, RCS (Rich
                Communication Services), WhatsApp, or other digital communication
                platforms.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function PoliciesClient() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <WordPullUp
            className="text-5xl font-extrabold text-nblue mb-4"
            words="Policies & Governance"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our policies ensure transparency, accountability, and maintain the
            highest standards of education and discipline at Brookfield
            International School.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/assets/pdf/Brookfield_WhatsApp_Channel_Policy_Clean.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-vgreen text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-hgreen transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span>Download WhatsApp Channel Policy</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={
                policy.text ===
                  "The school reserves the right to change any rule or policy as and when required" ||
                policy.text ===
                  "Students are not allowed to bring mobile phones, cameras, or any other electronic gadgets to school"
                  ? { height: "fit-content" }
                  : undefined
              }
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full overflow-hidden"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-vgreen/10 rounded-full flex items-center justify-center text-vgreen">
                  {policy.icon}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {policy.text}
                </p>
              </div>
            </motion.div>
          ))}

          <ConsentCard />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-vgreen/10 rounded-lg p-8 max-w-4xl mx-auto border border-vgreen/20">
            <h3 className="text-2xl font-bold text-nblue mb-4">
              Commitment to Excellence
            </h3>
            <p className="text-gray-700 leading-relaxed">
              These policies are designed to create a safe, disciplined, and
              nurturing environment where every student can thrive academically,
              socially, and emotionally.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
