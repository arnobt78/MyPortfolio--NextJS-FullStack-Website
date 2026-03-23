"use client";

import Link from "next/link";
import {
  FaGoogle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { SafeImage } from "@/components/ui/SafeImage";

const AboutPage = () => {
  const { t } = useLanguage();
  return (
    <section className="py-6 animate-ease-in-out">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center xl:text-left">
            {t("about.title")}
          </h1>

          <div className="bg-[#27272c] rounded-xl p-6 sm:p-10 space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl mb-4 text-accent">
                  {t("about.businessIdentity.title")}
                </h2>
                <a
                  href="https://websitelaunches.com/site/arnobmahmud.com"
                  target="_blank"
                  rel="noopener"
                  style={{ textDecoration: "none", border: "none" }}
                  title="This site is publicly listed and monitored by Website Launches."
                  className="flex-shrink-0"
                >
                  <SafeImage
                    src="https://websitelaunches.com/api/trust_badge.php?domain=arnobmahmud.com&theme=dark&style=default"
                    alt="Listed on Website Launches"
                    width={220}
                    height={54}
                    loader={({ src }) => src}
                    unoptimized
                    style={{ border: "none" }}
                    className="w-auto h-auto max-w-[180px] sm:max-w-[220px]"
                  />
                </a>
              </div>
              <p className="text-white/60 text-md sm:text-lg leading-relaxed mb-4">
                {t("about.businessIdentity.description.prefix")}{" "}
                <span className="text-white font-semibold">
                  {t("about.businessIdentity.businessName")}
                </span>
                {t("about.businessIdentity.description.suffix")}
              </p>

              {/* Google Business Profile Section */}
              <div className="mt-6 p-4 bg-[#1c1c22] rounded-lg border border-white/5">
                <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:gap-3">
                  <div className="flex items-center gap-3">
                    <FaGoogle className="text-accent text-xl" />
                    <h3 className="h3 text-white">
                      {t("about.businessIdentity.businessName")}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-xl w-fit">
                    {t("about.businessIdentity.verified")}
                  </span>
                </div>
                <p className="text-white/60 text-sm sm:text-base mb-4">
                  {t("about.businessIdentity.profileDescription")}
                </p>
                <div className="space-y-3 text-white/60 text-sm sm:text-base">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">
                        {t("about.businessIdentity.address.label")}
                      </p>
                      <p className="text-white/70">
                        Breubergstraße 11, 64823 Groß-Umstadt, Deutschland
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhoneAlt className="text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">
                        {t("about.businessIdentity.phone.label")}
                      </p>
                      <Link href="tel:+4915734664351" className="text-white/70">
                        +49 1573 4664351
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">
                        {t("about.businessIdentity.email.label")}
                      </p>
                      <Link
                        href="mailto:arnobt78@gmail.com"
                        className="text-white/70"
                      >
                        arnobt78@gmail.com
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                  <Link
                    href="https://share.google/rIr0pqkcyP3IUmnnf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-accent underline transition-colors duration-300 text-sm sm:text-base w-fit"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>{t("about.businessIdentity.viewOnGoogle")}</span>
                  </Link>
                  <a
                    id="cy-effective-orcid-url"
                    href="https://orcid.org/0009-0008-6913-6500"
                    target="orcid.widget"
                    rel="me noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent underline transition-colors text-sm sm:text-base w-fit"
                  >
                    <SafeImage
                      src="https://orcid.org/sites/default/files/images/orcid_16x16.png"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 flex-shrink-0"
                      unoptimized
                    />
                    <span>{t("about.businessIdentity.viewOrcid")}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-xl sm:text-2xl mb-4 text-accent">
                {t("about.portfolio.title")}
              </h2>
              <p className="text-white/60 text-md sm:text-lg leading-relaxed mb-4">
                {t("about.portfolio.paragraph1")}
              </p>
              <p className="text-white/60 text-md sm:text-lg leading-relaxed mb-4">
                {t("about.portfolio.paragraph2")}
              </p>
              <p className="text-white/60 text-md sm:text-lg leading-relaxed mb-4">
                {t("about.portfolio.paragraph3")}
              </p>
              <p className="text-white/60 text-md sm:text-lg leading-relaxed mb-4">
                {t("about.portfolio.paragraph4")}
              </p>
              <p className="text-white/60 text-md sm:text-lg leading-relaxed mb-4">
                {t("about.portfolio.paragraph5")}
              </p>
              <p className="text-white/60 text-md sm:text-lg leading-relaxed">
                {t("about.portfolio.paragraph6")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
