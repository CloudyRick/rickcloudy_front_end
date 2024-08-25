import { ProgressBarProps } from "../components/ProgressBar";

export interface ISkill {
  skillName: string;
  skillProps: ProgressBarProps[];
  taskNRes: string[];
}

export const navMenu = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blog-list" },
  { name: "Services", link: "/services" },
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about-me" },
];

export const otherResourcesFooter = [
  { name: "Privacy Policy", link: "/privacy-policies" },
  { name: "Terms & Condition", link: "/terms-conditions" },
  { name: "Contact Us", link: "/contact-us" },
];

export const skills: ISkill[] = [
  {
    skillName: "Front End Web Development",
    skillProps: [
      { progressPercentage: 90, progressName: "HTML" },
      { progressPercentage: 85, progressName: "CSS" },
      { progressPercentage: 80, progressName: "JavaScript" },
      { progressPercentage: 85, progressName: "Tailwind" },
      { progressPercentage: 80, progressName: "React" },
      { progressPercentage: 75, progressName: "Figma" },
      { progressPercentage: 85, progressName: "Responsive Design" },
    ],
    taskNRes: [
      "Creating web display using HTML, CSS, and JavaScript.",
      "Take the benefit of front-end framework and libraries.",
      "Configuring website routing.",
      "Design the website prototype using figma.",
      "Applying authentication and authorization logic.",
      "Creating an easy to use navigation menu.",
    ],
  },
];
