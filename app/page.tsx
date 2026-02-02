import type { Metadata } from "next";
import HomePage from "../components/pages/HomePage";

export const metadata: Metadata = {
  title: "Arnob Mahmud | Full-Stack Engineer | Web & Cloud Solutions",
  description:
    "Full-Stack Software Engineer (5+ years) delivering enterprise web & API solutions. React, Next.js, Angular, Node.js, .NET, Python, AWS, Docker. Germany.",
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
    title: "Arnob Mahmud | Full-Stack Engineer | Web & Cloud Solutions",
    description:
      "Full-Stack Software Engineer (5+ years) delivering enterprise web & API solutions. React, Next.js, Angular, Node.js, .NET, Python, AWS, Docker.",
    url: "https://www.arnobmahmud.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnob Mahmud | Full-Stack Engineer | Web & Cloud Solutions",
    description:
      "Full-Stack Software Engineer delivering enterprise web & API solutions with modern tech stack.",
  },
  alternates: {
    canonical: "https://www.arnobmahmud.com",
  },
};

export default function Home() {
  return <HomePage />;
}
