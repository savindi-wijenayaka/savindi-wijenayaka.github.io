import { IconType } from "react-icons";
import {
  SiPython,
  SiPytorch,
  SiKeras,
  SiFlask,
  SiDjango,
  SiSpring,
  SiFastapi,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithubactions,
  SiSnowflake,
  SiGooglecloud,
  SiPostgresql,
} from "react-icons/si";
import {
  TbBrain,
  TbBrandAws,
  TbBrandAzure,
  TbEye,
  TbMessageCode,
  TbWaveSquare,
  TbMicroscope,
  TbFileText,
  TbPhoto,
  TbVideo,
  TbMicrophone,
  TbBox,
  TbCircleDot,
  TbGrid3X3,
  TbChartLine,
  TbTable,
  TbDatabase,
  TbActivity,
  TbApi,
  TbNetwork,
  TbRotateClockwise,
  TbRocket,
  TbCursorText,
  TbVectorTriangle,
  TbShieldCheck,
} from "react-icons/tb";
import { DiJava } from "react-icons/di";

export type SkillCategory =
  | "ML & Research"
  | "Languages & Frameworks"
  | "Data Types"
  | "Data & Cloud Infrastructure"
  | "Engineering Practices"
  | "AI Tooling";

export interface Skill {
  name: string;
  icon: IconType;
  category: SkillCategory;
}

const Skills: Skill[] = [
  // ML & Research
  { name: "LLM / VLM", icon: TbBrain, category: "ML & Research" },
  { name: "RAG Pipelines", icon: TbVectorTriangle, category: "ML & Research" },
  { name: "Computer Vision", icon: TbEye, category: "ML & Research" },
  { name: "NLP", icon: TbMessageCode, category: "ML & Research" },
  { name: "Signal Processing", icon: TbWaveSquare, category: "ML & Research" },
  { name: "Biomedical Modelling", icon: TbMicroscope, category: "ML & Research" },

  // Languages & Frameworks
  { name: "Python", icon: SiPython, category: "Languages & Frameworks" },
  { name: "FastAPI", icon: SiFastapi, category: "Languages & Frameworks" },
  { name: "PyTorch", icon: SiPytorch, category: "Languages & Frameworks" },
  { name: "Keras", icon: SiKeras, category: "Languages & Frameworks" },
  { name: "Flask", icon: SiFlask, category: "Languages & Frameworks" },
  { name: "Django", icon: SiDjango, category: "Languages & Frameworks" },
  { name: "Java", icon: DiJava, category: "Languages & Frameworks" },
  { name: "Spring Boot", icon: SiSpring, category: "Languages & Frameworks" },

  // Data Types
  { name: "Text", icon: TbFileText, category: "Data Types" },
  { name: "Image", icon: TbPhoto, category: "Data Types" },
  { name: "Video", icon: TbVideo, category: "Data Types" },
  { name: "Audio", icon: TbMicrophone, category: "Data Types" },
  { name: "3D", icon: TbBox, category: "Data Types" },
  { name: "Point Cloud", icon: TbCircleDot, category: "Data Types" },
  { name: "Mesh", icon: TbGrid3X3, category: "Data Types" },
  { name: "Time Series", icon: TbChartLine, category: "Data Types" },
  { name: "Tabular", icon: TbTable, category: "Data Types" },

  // Data & Cloud Infrastructure
  { name: "Azure", icon: TbBrandAzure, category: "Data & Cloud Infrastructure" },
  { name: "GCP", icon: SiGooglecloud, category: "Data & Cloud Infrastructure" },
  { name: "AWS", icon: TbBrandAws, category: "Data & Cloud Infrastructure" },
  { name: "Docker", icon: SiDocker, category: "Data & Cloud Infrastructure" },
  { name: "Kubernetes", icon: SiKubernetes, category: "Data & Cloud Infrastructure" },
  { name: "Snowflake", icon: SiSnowflake, category: "Data & Cloud Infrastructure" },
  { name: "Postgres", icon: SiPostgresql, category: "Data & Cloud Infrastructure" },
  { name: "pgvector", icon: TbVectorTriangle, category: "Data & Cloud Infrastructure" },
  { name: "MSSQL", icon: TbDatabase, category: "Data & Cloud Infrastructure" },
  { name: "Azure Data Explorer", icon: TbDatabase, category: "Data & Cloud Infrastructure" },
  { name: "Stream Analytics", icon: TbActivity, category: "Data & Cloud Infrastructure" },
  { name: "Transact-SQL", icon: TbDatabase, category: "Data & Cloud Infrastructure" },

  // Engineering Practices
  { name: "Git", icon: SiGit, category: "Engineering Practices" },
  { name: "GitHub Actions", icon: SiGithubactions, category: "Engineering Practices" },
  { name: "Azure DevOps", icon: TbBrandAzure, category: "Engineering Practices" },
  { name: "REST", icon: TbApi, category: "Engineering Practices" },
  { name: "gRPC", icon: TbNetwork, category: "Engineering Practices" },
  { name: "Agile", icon: TbRotateClockwise, category: "Engineering Practices" },
  { name: "Responsible AI & Governance", icon: TbShieldCheck, category: "Engineering Practices" },

  // AI Tooling
  { name: "Claude", icon: TbBrain, category: "AI Tooling" },
  { name: "Cursor", icon: TbCursorText, category: "AI Tooling" },
  { name: "Antigravity", icon: TbRocket, category: "AI Tooling" },
];

export default Skills;

export const SkillCategories: SkillCategory[] = [
  "ML & Research",
  "Languages & Frameworks",
  "Data Types",
  "Data & Cloud Infrastructure",
  "Engineering Practices",
  "AI Tooling",
];
