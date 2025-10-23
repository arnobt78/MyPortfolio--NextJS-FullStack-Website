import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "../components/ScrollToTop";
import StairTransition from "../components/StairTranstion";
import PageTransition from "../components/PageTransition";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arnob-mahmud.vercel.app"),
  title:
    "Arnob Mahmud | Full-Stack Developer, Automation & Digital Solutions Engineer | Frankfurt, Germany",
  description:
    "Dynamic Full-Stack Developer based in Frankfurt, Germany, with 4+ years of experience building fast, scalable web and mobile apps. Specialized in React, Next.js, Angular, Node.js, Python, DotNET, PostgreSQL, NoSQL and cloud deployments (AWS, Vercel, Docker, Kubernetes). Proven expertise in UI/UX, test automation, SEO, and Google Ads. Explore my portfolio, certifications, and projects in web, mobile, automation, and digital marketing.",
  keywords: [
    "Arnob Mahmud",
    "Full-Stack Developer",
    "Web Developer",
    "Mobile App Developer",
    "Automation Engineer",
    "Digital Solutions Engineer",
    "React",
    "Next.js",
    "Angular",
    "Node.js",
    "Python",
    "DotNET",
    "PostgreSQL",
    "NoSQL",
    "Cloud",
    "AWS",
    "Vercel",
    "Docker",
    "Kubernetes",
    "UI/UX",
    "Test Automation",
    "Selenium",
    "Cypress",
    "SEO",
    "Google Ads",
    "Portfolio",
    "Frankfurt",
    "Germany",
    "GitHub",
    "LinkedIn",
    "OpenAI",
    "Machine Learning",
    "Figma",
    "Stripe",
    "Odoo ERP",
    "CakePHP",
    "Jira",
    "DevOps",
    "Digital Marketing",
    "English",
    "German",
    "Bengali",
    "Hindi",
    "Urdu",
  ],
  authors: [{ name: "Arnob Mahmud" }],
  creator: "Arnob Mahmud",
  publisher: "Arnob Mahmud",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Arnob Mahmud Portfolio",
  openGraph: {
    title:
      "Arnob Mahmud | Full-Stack Web Developer & Automation Engineer | Frankfurt, Germany",
    description:
      "Portfolio of Arnob Mahmud, Full-Stack Web Developer and Automation Engineer in Frankfurt, Germany. Explore projects in web, mobile, automation, SEO, and cloud.",
    url: "https://arnob-mahmud.vercel.app",
    siteName: "Arnob Mahmud Portfolio",
    images: [
      {
        url: "/assets/photo.png",
        width: 800,
        height: 800,
        alt: "Arnob Mahmud - Full-Stack Developer in Frankfurt, Germany",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@arnob_t78",
    creator: "@arnob_t78",
    title:
      "Arnob Mahmud | Full-Stack Web Developer & Automation Engineer | Frankfurt, Germany",
    description:
      "Portfolio of Arnob Mahmud, Full-Stack Web Developer and Automation Engineer in Frankfurt, Germany. Explore projects in web, mobile, automation, SEO, and cloud.",
    images: ["/assets/photo.png"],
  },
  alternates: {
    canonical: "https://arnob-mahmud.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jetbrainsMono.variable} suppressHydrationWarning>
        <GoogleAnalytics />
        <Analytics />
        <ScrollToTop />
        <StairTransition />
        <Header />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
