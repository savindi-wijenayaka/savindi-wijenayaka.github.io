export type EntryType = "industry" | "academic";

export interface ExperienceEntry {
  id: string;
  type: EntryType;
  role: string;
  company: string;
  companyShort: string;
  dateRange: string;
  location: string;
  description: string[];
  techStack: string[];
  companyUrl?: string;
}

const Experience: ExperienceEntry[] = [
  // ── Industry ───────────────────────────────────────────────────────────
  {
    id: "auror",
    type: "industry",
    role: "Intermediate Machine Learning Engineer",
    company: "Auror",
    companyShort: "Auror",
    dateRange: "Sept 2025 - Present",
    location: "Auckland, New Zealand",
    description: [
      "Drove technical stewardship of a legacy production ML system through dependency mapping, infrastructure migration, and model readiness criteria definition, successfully deploying a new model to production via staged rollout.",
      "Recognised a critical deployment pipeline risk and addressed it by designing and implementing a staged CI/CD release process, establishing a controlled and deliberate release workflow for the team.",
      "Proactively established team-wide engineering and governance standards, introducing agentic coding guidelines across ML repositories and initiating a data licensing analysis to prevent compliance risks, which the team later expanded into a broader data governance framework.",
      "Architected a modular ML evaluation and fairness reporting framework, accelerating the prospect trial phase and reducing report turnaround by 80%, shortening the path to technical win.",
    ],
    techStack: ["Python", "Azure", "Kubernetes", "CI/CD", "ML Evaluation", "LightGBM"],
    companyUrl: "https://www.auror.co",
  },
  {
    id: "wso2",
    type: "industry",
    role: "Machine Learning Engineer",
    company: "WSO2",
    companyShort: "WSO2",
    dateRange: "Sept 2020 - Nov 2021",
    location: "Colombo, Sri Lanka",
    description: [
      "Researched and delivered a GPT-based model for automated API test case generation, deployed on Azure Kubernetes Service, reducing testing effort for customers and enabling an AI-assisted developer workflow.",
      "Co-architected a time series-based AI Anomaly Detection system using an event-driven microservices architecture across Azure Stream Analytics, Event Hubs, and Function Apps, enabling customers to detect abnormal application behaviours in real time.",
      "Implemented a regression testing pipeline for the Ballerina Language Server, systematically surfacing performance degradations and resource utilisation issues to ensure production reliability for users.",
      "Diagnosed and resolved a critical memory leak in the Ballerina Language Server, applying systematic profiling with JMeter and Eclipse Memory Analyser, to eliminate server crashes and restore resource efficiency.",
    ],
    techStack: ["Python", "Azure", "Kubernetes", "GPT", "Flask", "Ballerina"],
    companyUrl: "https://wso2.com",
  },
  {
    id: "pearson",
    type: "industry",
    role: "Software Research Engineer",
    company: "Pearson",
    companyShort: "Pearson",
    dateRange: "Sept 2018 - Sept 2019",
    location: "Colombo, Sri Lanka",
    description: [
      "Researched and implemented deep learning modules for emotion detection and speech analysis, integrating models into scalable RESTful microservices for a real-time AI Public Speaking Evaluator.",
      "Researched and built a Q&A chatbot for Pearson's educational content, iterating from BiDAF to fine-tuned BERT and GPT-2 models to improve answer quality and enable conversational querying of learning material.",
      "Investigated and developed a flashcard classification service using ULMFiT, LSTM, and GRU to automatically categorise flashcards, reducing manual tagging effort and improving content discoverability for students.",
    ],
    techStack: ["Python", "Keras", "BERT", "GPT-2", "Flask", "Django"],
    companyUrl: "https://www.pearson.com",
  },

  // ── Academic ────────────────────────────────────────────────────────────
  {
    id: "uoa-phd",
    type: "academic",
    role: "PhD in Bioengineering",
    company: "University of Auckland",
    companyShort: "UoA",
    dateRange: "Nov 2021 - May 2025",
    location: "Auckland, New Zealand",
    description: [
      "Developed deep learning models for medical image segmentation and physiological parameter quantification, combining bioengineering domain knowledge with state-of-the-art computer vision techniques.",
      "Contributed to the SPARC FAIR Codeathon (2022 Winners, 2024 1st Runners Up), building open-source Python tooling for standardised biomedical dataset access and 3D anatomical visualisation.",
    ],
    techStack: ["Python", "PyTorch", "MONAI", "Medical Imaging", "NumPy"],
    companyUrl: "https://www.auckland.ac.nz",
  },
  {
    id: "uok-bsc",
    type: "academic",
    role: "BSc (Hons) in Software Engineering",
    company: "University of Kelaniya",
    companyShort: "UoK",
    dateRange: "Feb 2016 - March 2020",
    location: "Kelaniya, Sri Lanka",
    description: [
      "Graduated with First Class Honours. Specialised in software engineering, machine learning, and data science.",
      "Led the Women's Karate Team as Captain and served as Vice President of Marketing & Communications at AIESEC Colombo North LC.",
    ],
    techStack: ["Java", "Python", "Machine Learning", "Data Science"],
    companyUrl: "https://www.kln.ac.lk",
  },
];

export default Experience;
