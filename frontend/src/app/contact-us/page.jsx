export const metadata = {
  title: "Contact Us | Brookfield International School",
  description:
    "Contact Brookfield International School to learn about admissions, curriculums, events, or any questions about our vibrant learning environment.",
  alternates: {
    canonical: "https://www.bfis.in/contact-us",
  },
};

import ContactUsClient from "./ContactUsClient";

export default function ContactUs() {
  return <ContactUsClient />;
}
