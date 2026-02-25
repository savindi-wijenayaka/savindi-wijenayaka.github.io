import { IconType } from "react-icons";
import { BsMedium } from "react-icons/bs";
import { FaGithubAlt, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export interface Social {
  icon: IconType;
  link: string;
}

const Socials: Social[] = [
  {
    icon: FaLinkedinIn,
    link: "https://www.linkedin.com/in/savindi",
  },
  {
    icon: FaGithubAlt,
    link: "https://github.com/savindi-wijenayaka",
  },
  {
    icon: BsMedium,
    link: "https://savindi-wijenayaka.medium.com",
  },
  {
    icon: FaInstagram,
    link: "https://www.instagram.com/vindy_stories",
  },
];

export default Socials;
