export const metadata = {
  title: "What Sets Us Apart | Brookfield International School",
  description:
    "Discover what sets Brookfield International School apart - innovative learning, holistic development, and a nurturing environment for every student.",
  alternates: {
    canonical: "https://www.bfis.in/about/set-us-apart",
  },
};

import AboutLayout from "@/app/components/sections/abouts/AboutLayout";
import AboutSetUsApart from "@/app/components/sections/abouts/AboutSetUsApart";

const sidebarLinks = [
  { href: "/about/message", label: "Message" },
  { href: "/about/values", label: "Our Values" },
  { href: "/about/set-us-apart", label: "What Sets Us Apart" },
];

export default function AboutSetUsApartPage() {
  return (
    <AboutLayout sidebarLinks={sidebarLinks}>
      <AboutSetUsApart />
    </AboutLayout>
  );
}
