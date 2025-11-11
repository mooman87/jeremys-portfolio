export type Project = {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  role?: string;
  impact?: string;
  period?: string;
};

export const projects: Project[] = [
  
  {
    title: "Lynx",
    description: "Managing a political campaign is a lot like running a mini-startup. If you've never done either, tracking the most critical metrics can feel quite daunting. Lynx takes the guesswork out of standing up a run for office or a ballot initiative by allowing for seamless project creation and management.",
    image: "/lynx.png",
    tags: ["Ops", "Growth", "Strategy"],
    link: "https://lynx-erm.netlify.app/",
    role: "Project Manager/Developer",
    impact: "",
    period: "2024-2025"
  },
  {
    title: "Case Manager",
    description: "I built a lightweight, well-organized platform to improve the experience of support staff workflows in biopharmaceutical access. Case Manager was deployed to a 10-person internal team resulting in ~40% improvement across all KPIs.",
    image: "/casemgr.png",
    tags: ["Pharmacy", "Healthcare", "Internal Tools"],
    link: "https://casemgr.netlify.app",
    role: "Case Manager/Developer",
    impact: "",
    period: "2022"
  },
  {
    title: "Anios",
    description: "When SpaceX put two men on the ISS for the first time, I felt like I caught a glimpse of the future. I was inspired to build the world's first unified marketplace for outer space exploration. Anios delivers the outer space marketplace to your browser.",
    image: "/aniosindustries.png",
    tags: ["Space Exploration", "SaaS", "Ops"],
    link: "https://aniosindustries.com",
    role: "Chief Visionary",
    impact: "",
    period: "2020-Present"
  }
];
