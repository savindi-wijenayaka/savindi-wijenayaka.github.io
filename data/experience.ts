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
    role: "Machine Learning Engineer",
    company: "Auror",
    companyShort: "Auror",
    dateRange: "Sept 2025 - Present",
    location: "Auckland, New Zealand",
    description: [
      "Spearheaded scoping, planning, and architecture of a RAG-based compliance questionnaire system on GCP, using a reranker, embeddings, Postgres with pgvector, and BAML for structured LLM outputs, directing two engineers through full-stack implementation.",
      "Designed a multi-gate evaluation framework for Auror's flagship entity resolution product, resolving class imbalance and circular bias; shipped a new model to production via a region-separated CI/CD pipeline, contributing to a 15-23pp increase in acceptance rates across all 4 regions.",
      "Architected an ML evaluation and fairness reporting framework for prospect trials, reducing report turnaround by 80% and accelerating path to technical win.",
      "Established team-wide ML engineering standards via agentic coding conventions and a data licensing review, forming the foundation for a broader responsible AI and data governance framework.",
      "Prototyped an LPR camera health monitoring system by mapping vehicle detections to spatial heatmaps and flagging deviations from optimal detection zones, enabling automated identification of camera obstructions.",
    ],
    techStack: ["Python", "GCP", "RAG", "Postgres", "CI/CD", "ML Evaluation"],
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
      "Designed and deployed an LLM-based generative AI system leveraging few-shot learning for automated API test case generation on Azure Kubernetes Service, reducing manual testing effort for customers and enabling an AI-assisted developer workflow.",
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
    role: "Software Engineer (ML/AI)",
    company: "Pearson",
    companyShort: "Pearson",
    dateRange: "Sept 2018 - Sept 2019",
    location: "Colombo, Sri Lanka",
    description: [
      "Researched and built a Q&A chatbot for Pearson's educational content, iterating from BiDAF to fine-tuned BERT and GPT-2 models to improve answer quality and enable conversational querying of learning material.",
      "Researched and implemented deep learning modules for emotion detection and speech analysis, integrating models into scalable RESTful microservices for an AI Public Speaking Evaluator.",
      "Investigated and developed a flashcard classification service using ULMFiT, LSTM, and GRU to automatically categorise flashcards, reducing manual tagging effort and improving content discoverability for students.",
    ],
    techStack: ["Python", "Keras", "BERT", "GPT-2", "Flask", "Django"],
    companyUrl: "https://www.pearson.com",
  },

  // ── Academic ────────────────────────────────────────────────────────────
  {
    id: "uoa-phd",
    type: "academic",
    role: "Ph.D. in Bioengineering",
    company: "University of Auckland",
    companyShort: "UoA",
    dateRange: "Dec 2021 - May 2025",
    location: "Auckland, New Zealand",
    description: [
      "Engineered a semantic segmentation model with multiscale attention mechanisms, conducting extensive ablation studies to optimise architecture and delivering an automated analysis pipeline that reduced manual processing time by 40+ hours per dataset.",
      "Developed a Python-based 3D quantification framework grounded in advanced mathematical methods, transforming raw micro-CT data into structured geometric benchmarks and standardising the full workflow from ground-truth labelling to downstream modelling and simulation.",
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
      "Specialised in Data Science and Net-centric application development, graduating with a GPA of 3.96/4.00 and First Class Honours.",
      "Dean's List Honouree, recognised in all four academic years of the B.Sc. programme.",
      "Led the Women's Karate Team as Captain and served as Vice President of Marketing & Communications at AIESEC Colombo North LC.",
    ],
    techStack: ["Java", "Python", "Machine Learning", "Data Science"],
    companyUrl: "https://www.kln.ac.lk",
  },
];

export default Experience;
