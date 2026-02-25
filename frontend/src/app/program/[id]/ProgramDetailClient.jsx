"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { subjects } from "@/app/lib/data/programSubjects";

export default function ProgramDetailClient() {
  const params = useParams();
  const router = useRouter();
  const subject = useMemo(
    () => subjects.find((s) => s.id === params?.id),
    [params]
  );

  useEffect(() => {
    if (!subject) router.replace("/program");
  }, [subject, router]);

  if (!subject) return null;

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-10">
      <div className="max-w-6xl mx-auto bg-white rounded shadow">
        {/* Top banner image with back button overlay */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img
            src={subject.image}
            alt={subject.title}
            className="w-full h-full object-cover"
          />
          <Link
            href="/program"
            className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-2 bg-white/95 text-gray-800 rounded-lg border border-gray-200 shadow hover:bg-white"
          >
            <span className="mr-1">‹</span>
            <span className="font-semibold">Back to Programs</span>
          </Link>
        </div>

        <div className="px-6 md:px-10 py-8">
          {/* Back to Programs */}
          <div className="mb-4">
            <Link
              href="/program"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
            >
              {/* simple chevron using text */}
              <span className="mr-1">‹</span> Back to Programs
            </Link>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#FFB800]">
            {subject.title}
          </h1>

          {/* Overview */}
          <h2 className="mt-8 text-2xl md:text-3xl font-bold text-gray-900">
            Overview
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            {subject.description}
          </p>

          {/* Highlight card */}
          {subject.highlight && (
            <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-6">
              <p className="font-semibold text-gray-900">Highlight</p>
              <p className="mt-2 text-gray-700">{subject.highlight}</p>
            </div>
          )}

          {/* Detailed Information */}
          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-gray-900">
            Detailed Information
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 text-gray-700 leading-relaxed"
          >
            <pre className="whitespace-pre-wrap font-sans text-[17px] leading-7">
              {subject.fullDescription}
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
