"use client";

import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

interface Service {
  num: string;
  title: string;
  description: string;
  href: string;
}

const services: Service[] = [
  {
    num: "01",
    title: "Web / Mobile Development",
    description:
      "Experienced web developer with a focus on crafting responsive, user-friendly websites & scalable web applications. Dedicated to delivering clean code & innovative solutions that are customized to meet your business needs.",
    href: "/contact",
  },
  {
    num: "02",
    title: "UI / UX Design",
    description:
      "Creative UI/UX designer dedicated to crafting intuitive & visually appealing digital experiences. I translate user insights into seamless, engaging designs that enhance interaction & satisfaction.",
    href: "/contact",
  },
  {
    num: "03",
    title: "Test Automation",
    description:
      "Detail-oriented Software Testing (QA) Engineer with expertise in ensuring high-quality software through rigorous testing. I specialize in identifying defects, optimizing performance, & ensuring that applications meet user requirements. I'm committed to delivering reliable, bug-free solutions that enhance user satisfaction & drive business success.",
    href: "/contact",
  },
  {
    num: "04",
    title: "Cyber Security",
    description:
      "Focused on safeguarding digital assets & systems from cyber threats. I excel in implementing robust security measures, monitoring vulnerabilities, & developing strategies to protect sensitive information. My commitment is to ensure the integrity, confidentiality, & availability of your data, providing peace of mind & robust protection against evolving cyber threats.",
    href: "/contact",
  },
];

const ServicesPage = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-4 xl:pb-4 animate-ease-in-out">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-16 items-stretch">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-between gap-4 group h-full"
              >
                {/* top  */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[50px] h-[50px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-[32px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description  */}
                <p className="text-white/60 text-justify">
                  {service.description}
                </p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
