export const metadata = {
  title: "Values and Ethos | Brookfield International School",
  description:
    "Discover Brookfield International School's core values and ethos that guide our educational philosophy, fostering creativity, respect, and holistic development in every student.",
  alternates: {
    canonical: "https://www.bfis.in/about/values",
  },
};

import AboutLayout from "@/app/components/sections/abouts/AboutLayout";
import AboutValues from "@/app/components/sections/abouts/AboutValues";

const sidebarLinks = [
  { href: "/about/message", label: "Message" },
  { href: "/about/values", label: "Our Values" },
  { href: "/about/set-us-apart", label: "What Sets Us Apart" },
];

export default function AboutValuesPage() {
  return (
    <AboutLayout sidebarLinks={sidebarLinks}>
      <AboutValues />
    </AboutLayout>
  );
}
