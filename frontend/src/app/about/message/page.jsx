export const metadata = {
  title: "Principal's Message | Brookfield International School",
  description:
    "Read the Principal's message at Brookfield International School, sharing the vision, values, and commitment to holistic student development and excellence.",
  alternates: {
    canonical: "https://www.bfis.in/about/message",
  },
};

import AboutLayout from "@/app/components/sections/abouts/AboutLayout";
import AboutMessage from "@/app/components/sections/abouts/AboutMessage";

const sidebarLinks = [
  { href: "/about/message", label: "Message" },
  { href: "/about/values", label: "Our Values" },
  { href: "/about/set-us-apart", label: "What Sets Us Apart" },
];

export default function AboutMessagePage() {
  return (
    <AboutLayout sidebarLinks={sidebarLinks}>
      <AboutMessage />
    </AboutLayout>
  );
}
