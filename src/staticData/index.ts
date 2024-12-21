import { ProgressBarProps } from "../components/ProgressBar";

export interface ISkill {
  skillName: string;
  skillProps: ProgressBarProps[];
  taskNRes: string[];
}

export const navMenu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blogs", link: "/blog-list" },
  { id: 3, name: "Services", link: "/services" },
  { id: 4, name: "Projects", link: "/projects" },
  { id: 5, name: "About", link: "/about-me" },
];

export const otherResourcesFooter = [
  { id: 1, name: "Privacy Policy", link: "/privacy-policies" },
  { id: 2, name: "Terms & Condition", link: "/terms-conditions" },
  { id: 3, name: "Contact Us", link: "/contact-us" },
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
