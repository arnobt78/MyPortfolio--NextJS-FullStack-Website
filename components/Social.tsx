import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/arnobt78" },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/arnob-mahmud-05839655/",
  },
  { icon: <FaYoutube />, path: "https://www.youtube.com/@arnobcorleone8570" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/arnob_t78/" },
];

interface SocialProps {
  containerStyles: string;
  iconStyles: string;
}

const Social = ({ containerStyles, iconStyles }: SocialProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link href={item.path} key={index} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
