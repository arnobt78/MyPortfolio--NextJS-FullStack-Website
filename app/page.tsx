import type { Metadata } from "next";
import HomePage from "../components/pages/HomePage";

export const metadata: Metadata = {
  title:
    "Arnob Mahmud | Full-Stack Engineer | Web, API, SaaS, & Cloud Solutions",
  description:
    "Full-Stack Software Engineer with 5+ years of experience delivering scalable, secure, enterprise-grade web, API, SaaS, and cloud solutions using React, Next.js, Angular, Node.js, Python, .NET, and modern cloud platforms. Experienced in client-facing startup and ERP environments, working independently as well as collaboratively within cross-functional teams, with a strong focus on scalable architecture, code quality, testing, performance optimization, security, and reliable production delivery.",
  keywords: [
    "Full-Stack Software Engineer",
    "Software Engineer Germany",
    "Software Engineer Frankfurt",
    "Web Application Development",
    "Enterprise Software",
    "React",
    "Next.js",
    "Angular",
    "Node.js",
    ".NET",
    "Python",
    "REST APIs",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "Freelance Software Engineer",
  ],
  openGraph: {
    title:
      "Arnob Mahmud | Full-Stack Engineer | Web, API, SaaS, & Cloud Solutions",
    description:
      "Full-Stack Software Engineer with 5+ years of experience delivering scalable, secure, enterprise-grade web, API, SaaS, and cloud solutions using React, Next.js, Angular, Node.js, Python, .NET, and modern cloud platforms. Experienced in client-facing startup and ERP environments, working independently as well as collaboratively within cross-functional teams, with a strong focus on scalable architecture, code quality, testing, performance optimization, security, and reliable production delivery.",
    url: "https://www.arnobmahmud.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Arnob Mahmud | Full-Stack Engineer | Web, API, SaaS, & Cloud Solutions",
    description:
      "Full-Stack Software Engineer with 5+ years of experience delivering scalable, secure, enterprise-grade web, API, SaaS, and cloud solutions using React, Next.js, Angular, Node.js, Python, .NET, and modern cloud platforms. Experienced in client-facing startup and ERP environments, working independently as well as collaboratively within cross-functional teams, with a strong focus on scalable architecture, code quality, testing, performance optimization, security, and reliable production delivery.",
  },
  alternates: {
    canonical: "https://www.arnobmahmud.com/",
  },
};

export default function Home() {
  return <HomePage />;
}
