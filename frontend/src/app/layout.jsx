// app/layout.jsx
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientLayout from "./ClientLayout";
import { Montserrat, Poppins } from "next/font/google";
import NormalizeUrl from "./components/NormalizeUrl";
import GoogleTagManager from "./components/GoogleTagManager";

// Import Montserrat and Poppins, each as a CSS variable for easiest targeting
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Best CBSE Co Education School in Chandigarh, Mohali | BFIS",
  description:
    "BFIS is a top CBSE co-educational school in Chandigarh & Mohali, offering quality education, holistic development, and modern learning facilities.",
  keywords: [
    "best school in chandigarh",
    "Schools in chandigarh",
    "best schools in mohali",
    "Co Ed School In Chandigarh",
    "international school",
    "Mohali",
    "Chandigarh",
    "Kurali",
    "Brookfield International School",
    "BFIS",
    "education",
    "CBSE school",
  ],
  authors: [{ name: "Brookfield International School" }],
  alternates: {
    canonical: "https://www.bfis.in",
  },
  openGraph: {
    title: "Best CBSE Co Education School in Chandigarh, Mohali | BFIS",
    description:
      "BFIS is a top CBSE co-educational school in Chandigarh & Mohali, offering quality education, holistic development, and modern learning facilities.",
    url: "https://www.bfis.in",
    siteName: "Brookfield International School",
    images: [
      {
        url: "/assets/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Brookfield International School Social Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best CBSE Co Education School in Chandigarh, Mohali | BFIS",
    description:
      "BFIS is a top CBSE co-educational school in Chandigarh & Mohali, offering quality education, holistic development, and modern learning facilities.",
    site: "@yourtwitterhandle", // Replace with your Twitter
    creator: "@yourtwitterhandle",
    images: ["/assets/social-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
      { url: "/assets/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/favicon.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} scroll-smooth font-sans`}
    >
      <body className="antialiased bg-background text-foreground">
        <GoogleTagManager />
        <NormalizeUrl /> {/* Client-side hook isolated here */}
        {/* This ensures background, header/footer, and modals */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
