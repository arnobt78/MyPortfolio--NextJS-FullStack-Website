"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaVuejs,
  FaAngular,
  FaJava,
  FaPhp,
  FaStripe,
} from "react-icons/fa";

import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { ScrollArea } from "../ui/scroll-area";

// TypeScript interfaces
interface InfoItem {
  fieldName: string;
  fieldValue: string;
}

interface AboutData {
  title: string;
  description: string;
  info: InfoItem[];
}

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
}

interface ExperienceData {
  icon: string;
  title: string;
  description: string;
  items: ExperienceItem[];
}

interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
}

interface EducationData {
  icon: string;
  title: string;
  description: string;
  items: EducationItem[];
}

interface SkillItem {
  icon: JSX.Element;
  name: string;
}

interface SkillsData {
  title: string;
  description: string;
  skillList: SkillItem[];
}

// About data
const about: AboutData = {
  title: "About me",
  description:
    "Driven Full-Stack Developer with 4+ years of experience building scalable, high-performance web & mobile solutions. I've delivered user-focused applications that enhance business efficiency through clean architecture, automation, & cloud-ready deployment. Skilled in modern frontend & backend stacks, I combine technical precision with strong UI/UX & security practices to deliver maintainable, production-ready results that solve real problems.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Arnob Mahmud",
    },
    {
      fieldName: "Phone",
      fieldValue: "+4915734664351",
    },
    {
      fieldName: "Experience",
      fieldValue: "4+ Years",
    },
    {
      fieldName: "skype",
      fieldValue: "arnob_t78",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Bangladeshi",
    },
    {
      fieldName: "Email",
      fieldValue: "arnob_t78@yahoo.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English (C2), German (B1), Bengali (Native), Hindi, Urdu",
    },
  ],
};

// Experience data
const experience: ExperienceData = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description:
    "Web & Mobile Application Developer with a strong focus on quality, performance, & reliability. I build intuitive, high-performing apps backed by clean code & rigorous testing, ensuring seamless user experiences from development to deployment.",
  items: [
    {
      company: "Freelance/Self-Employed, Remote",
      position: "Full-Stack Web Developer",
      duration: "June 2025 - Present",
    },
    {
      company: "Sernitas GmbH, Bochum, Germany",
      position: "Full-Stack Web Developer",
      duration: "March 2025 - July 2025",
    },
    {
      company: "Frankfurt University of Applied Sciences, Frankfurt, Germany",
      position: "Student Research Assistant",
      duration: "2017 - 2023",
    },
    {
      company: "get it live GmbH, Nidderau, Germany",
      position: "Mobile Application Developer",
      duration: "November 2015 - June 2016",
    },
    {
      company: "LEADS Corporation Limited, Dhaka, Bangladesh",
      position: "Software Test Engineer",
      duration: "February 2013 - November 2013",
    },
    {
      company: "Green Generation IT Ltd, Dhaka, Bangladesh",
      position: "Junior Software Developer",
      duration: "June 2012 - December 2012",
    },
  ],
};

// Education data
const education: EducationData = {
  icon: "/assets/resume/cap.svg",
  title: "My Courses",
  description:
    "Bachelor's in Computer Science & Engineering and Master's in High Integrity Systems (Informatik) from Frankfurt University of Applied Sciences. My academic foundation & practical experience together fuel my expertise in full-stack development & scalable digital solutions.",
  items: [
    {
      institution: "Udemy Online Courses",
      degree: "Advanced NextJS/Framer-Motion Web Development Bootcamp",
      duration: "2023 - 2025",
    },
    {
      institution: "Udemy Online Courses",
      degree: "Advanced RecatJS/TailwindCSS Web Development Bootcamp",
      duration: "2022 - 2024",
    },
    {
      institution:
        "Frankfurt University of Applied Sciences, Frankfurt, Germany",
      degree: "High Integrity Systems (M.Sc.)",
      duration: "2014 - 2024",
    },
    {
      institution:
        "Military Institute of Science & Technology, Dhaka, Bangladesh",
      degree: "Computer Science & Engineering (B.Sc.)",
      duration: "2008 - 2012",
    },
  ],
};

// Skill data
const skills: SkillsData = {
  title: "My Skills",
  description:
    "Versatile across modern tech stacks — React, Next.js, Angular, Node.js, .NET, C++, Python — with strong expertise in REST APIs, databases, & automated testing. Experienced in UI/UX frameworks & cloud deployment using Docker, Kubernetes, AWS, Vercel, Netlify, & more. Continuously advancing my skills through real-world, production-level projects.",
  skillList: [
    {
      icon: <FaJs />,
      name: "javaScript",
    },
    {
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <FaVuejs />,
      name: "Vue.js",
    },
    {
      icon: <FaAngular />,
      name: "Angular",
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js",
    },
    {
      icon: <FaNodeJs />,
      name: "node.js",
    },
    {
      icon: <FaJava />,
      name: "Java",
    },
    {
      icon: <FaPhp />,
      name: "PHP",
    },
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    },
    {
      icon: <FaStripe />,
      name: "Stripe",
    },
  ],
};

const ResumePage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center py-4 xl:pb-4 animate-ease-in-out">
      <div className="container mx-auto">
        <Tabs
          defaultValue="about"
          className="flex flex-col xl:flex-row gap-16 animate-ease-in-out"
          style={{ animationDelay: "0s" }}
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="about">About me</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[90vh] w-full ">
            {/* experience */}
            <TabsContent
              value="experience"
              className="w-full text-center xl:text-left"
            >
              <div
                className="flex flex-col gap-[30px] text-center xl:text-left animate-ease-in-out"
                style={{ animationDelay: "0s" }}
              >
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[1000px] text-white/60 text-justify mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[200px] py-6 px-6 rounded-xl flex flex-col justify-center items-center gap-1"
                        >
                          <h3 className=" text-accent">{item.duration}</h3>
                          <h3 className="max-w-[600px]  text-center">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3 text-center">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60 ">{item.company}</p>
                          </div>
                          {/* <span className=" text-white/60 lg:items-start lg:items-left">{item.location}</span> */}
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div
                className="flex flex-col gap-[30px] text-center xl:text-left animate-ease-in-out"
                style={{ animationDelay: "0s" }}
              >
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[1000px] text-white/60 text-justify mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[200px] py-6 px-6 rounded-xl flex flex-col justify-center items-center gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className=" max-w-[600px] text-center">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3 text-center">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div
                className="flex flex-col gap-[30px] animate-ease-in-out"
                style={{ animationDelay: "0s" }}
              >
                <div className="flex flex-col gap-[30px] text-center xl:text-left ">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[1000px] text-white/60 text-justify mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[20px]">
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* About me */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div
                className="flex flex-col gap-[30px] animate-ease-in-out"
                style={{ animationDelay: "0s" }}
              >
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[1000px] text-white/60 text-justify mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 max-w-600px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumePage;
