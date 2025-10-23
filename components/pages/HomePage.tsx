"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "../Social";
import Photo from "../Photo";
import Stats from "../Stats";
import { useTypewriter } from "../../hooks/useTypewriter";

const HomePage = () => {
  const { displayText, isComplete } = useTypewriter({
    text: "Arnob Mahmud",
    speed: 200,
    delay: 2500,
  });

  return (
    <section>
      <div className="container mx-auto  animate-ease-in-out">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pb-12">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <h2
              className="h2 mb-5 animate-ease-in-out"
              style={{ animationDelay: "1.7s" }}
            >
              Hello! I&apos;m <br />{" "}
            </h2>
            <h1
              className="h1 mb-5 animate-ease-in-out"
              style={{ animationDelay: "1.8s" }}
            >
              <span className="text-accent">
                {displayText}
                {!isComplete && <span className="typewriter-cursor" />}
              </span>
            </h1>
            <span
              className="w-full xl:max-w-[600px] text-xl text-justify animate-ease-in-out justify-center mx-auto xl:mx-0"
              style={{ animationDelay: "2.0s" }}
            >
              Full-Stack Web Developer | Automation & Digital Solutions Engineer
            </span>
            <p
              className="w-full xl:max-w-[600px] mt-2 mb-8 text-white/80 text-justify animate-ease-in-out justify-center mx-auto xl:mx-0"
              style={{ animationDelay: "2.1s" }}
            >
              Proactive & results-driven Full-Stack Web Developer with 4+ years
              of experience delivering scalable, high-performance digital
              products from concept to launch. Renowned for transforming complex
              requirements into elegant, user-focused solutions that drive
              measurable business impact. A collaborative problem-solver with
              sharp analytical thinking, clear communication, & composure under
              pressure. Committed to creating high-value, results-oriented
              solutions that accelerate growth & profitability, while
              continuously refining my craft through innovation, technical
              excellence, & real-world experience in fast-paced, agile
              environments.
            </p>

            {/* button and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Link
                href="https://drive.google.com/file/d/1gCbh5M7cZRVKovP1w2IYVQH_gxWVgsCa/view?usp=sharing"
                target="_blank"
                className="animate-ease-in-out"
                style={{ animationDelay: "2.3s" }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download Resume </span>
                  <FiDownload />
                </Button>
              </Link>
              <div
                className="mb:8 xl:mb-0 animate-ease-in-out"
                style={{ animationDelay: "2.5s" }}
              >
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default HomePage;
