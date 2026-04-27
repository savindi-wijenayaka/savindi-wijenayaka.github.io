import { IconType } from "react-icons";
import { BsMedium } from "react-icons/bs";
import { FaGithubAlt, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export interface Social {
  icon: IconType;
  link: string;
  label: string;
}

const Socials: Social[] = [
  {
    icon: FaLinkedinIn,
    link: "https://www.linkedin.com/in/savindi",
    label: "LinkedIn",
  },
  {
    icon: FaGithubAlt,
    link: "https://github.com/savindi-wijenayaka",
    label: "GitHub",
  },
  {
    icon: BsMedium,
    link: "https://savindi-wijenayaka.medium.com",
    label: "Medium",
  },
  {
    icon: FaInstagram,
    link: "https://www.instagram.com/vindy_stories",
    label: "Instagram",
  },
];

export default Socials;
