import { type Social } from "@/constants/socials";
import { IconButton, LinkOverlay } from "@chakra-ui/react";

export const SocialButton = ({ social }: { social: Social }) => {
  return (
    <IconButton variant="outline" key={social.link}>
      <LinkOverlay key={social.link} href={social.link} target="blank">
        <social.icon />
      </LinkOverlay>
    </IconButton>
  );
};
