export type AchievementCategory = "Engineering" | "Extra Curriculum";
export type AchievementLevel = "International" | "National";

export interface Achievement {
  id: string;
  title: string;
  award: string;
  issuer?: string;
  year: string;
  level?: AchievementLevel;
  representing?: string;
  description: string;
  photo: string;
  projectUrl?: string;       // place images in /public/assets/achievements/
  category: AchievementCategory;
}

const Achievements: Achievement[] = [
  // Engineering
  {
    id: "sparc-2022",
    title: "Winners",
    award: "SPARC FAIR Codeathon",
    issuer: "NIH / SPARC Data Centre",
    year: "2022",
    level: "International",
    representing: "University of Auckland",
    description: "Built SPARC-ME, a Python library that lets researchers programmatically read, create, and convert standardised biomedical datasets, making it easier to share and reuse data across teams and platforms.",
    photo: "/assets/achievements/sparc-2022.png",
    projectUrl: "https://github.com/SPARC-FAIR-Codeathon/sparc-me",
    category: "Engineering",
  },
  {
    id: "sparc-2024",
    title: "1st Runners Up",
    award: "SPARC FAIR Codeathon",
    issuer: "NIH / SPARC Data Centre",
    year: "2024",
    level: "International",
    representing: "University of Auckland",
    description: "Built SPARC-SPy, a Python tool that generates 3D visualisations of anatomical datasets on a cloud platform, making biomedical research data easier to find, access, and reuse across teams.",
    photo: "/assets/achievements/sparc-2024.jpeg",
    projectUrl: "https://github.com/SPARC-FAIR-Codeathon/sparc-spy",
    category: "Engineering",
  },
  {
    id: "datastorm-2020",
    title: "4th Place",
    award: "DataStorm Datathon",
    issuer: "Octave, Sri Lanka",
    year: "2020",
    level: "National",
    representing: "University of Kelaniya",
    description: "In a Kaggle-style Data Science hackathon, built and compared a models for customer churn prediction, tackling imbalanced data to identify customers at risk of leaving.",
    projectUrl: "https://github.com/savindi-wijenayaka/DataStormV1",
    photo: "/assets/achievements/datastorm-2020.jpg",
    category: "Engineering",
  },

  // Extra Curriculum
  {
    id: "hackadev-2017",
    title: "1st Runners-Up",
    award: "HackaDev",
    issuer: "UNDP Sri Lanka",
    year: "2017",
    level: "National",
    representing: "University of Kelaniya",
    description: "Built a tech-driven solution to a pressing social and environmental problem in Sri Lanka, evaluated on feasibility, practicality, and impact, combining software engineering with business and innovation thinking.",
    photo: "/assets/achievements/hackadev-2017.jpg",
    category: "Engineering",
  },
  {
    id: "karate-2018",
    title: "Captain",
    award: "Women's Karate Team",
    issuer: "University of Kelaniya",
    year: "2018",
    description: "Captained the women's karate team, leading the squad to podium finishes across multiple championships, while maintaining individual form and earning national colours in the same year.",
    photo: "/assets/achievements/karate-2018.jpg",
    category: "Extra Curriculum",
  },
  {
    id: "aiesec-2018",
    title: "Vice President — Marketing & Comms",
    award: "AIESEC - Colombo North LC",
    issuer: "University of Kelaniya",
    year: "2018",
    // level: "National",
    // representing: "University of Kelaniya",
    description: "Led Marketting & Communication of the local chapter. At National Leadership Development Summit 2018, our chapter claimed 6 out of 9 awards, including the night's most prestigious title, \"Most Outstanding Local Committee\". A team win that meant more than any individual medal.",
    photo: "/assets/achievements/aiesec-2018.jpg",
    category: "Extra Curriculum",
  },
];

export default Achievements;

export const AchievementCategories: AchievementCategory[] = [
  "Engineering",
  "Extra Curriculum",
];
