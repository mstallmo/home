import {
  GitHubIcon,
  InstagramIcon,
  TwitterIcon,
  GlobeIcon,
} from "@/components/SocialIcons";

export function socialToIcon(social) {
  switch (social.site) {
    case "twitter":
      return TwitterIcon;
    case "instagram":
      return InstagramIcon;
    case "github":
      return GitHubIcon;
    default:
      return GlobeIcon;
  }
}
