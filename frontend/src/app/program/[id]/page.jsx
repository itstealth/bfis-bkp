import { subjects } from "@/app/lib/data/programSubjects";

export async function generateMetadata({ params }) {
  const subject = subjects.find((s) => s.id === params.id);

  if (!subject) {
    return {
      title: "Program Not Found | Brookfield International School",
      description: "The requested program could not be found.",
      alternates: {
        canonical: `https://www.bfis.in/program/${params.id}`,
      },
    };
  }

  return {
    title: `${subject.title} | Brookfield International School`,
    description: subject.description,
    alternates: {
      canonical: `https://www.bfis.in/program/${params.id}`,
    },
  };
}

import ProgramDetailClient from "./ProgramDetailClient";

export default function ProgramDetailPage() {
  return <ProgramDetailClient />;
}
