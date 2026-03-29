export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  companyShort: string;
  dateRange: string;
  location: string;
  highlights: string[];
  fullDescription: string[];
  techStack: string[];
  companyUrl?: string;
}

const Experience: ExperienceEntry[] = [
  {
    id: "uoa",
    role: "PhD Researcher / Machine Learning Engineer",
    company: "University of Auckland",
    companyShort: "University of Auckland",
    dateRange: "2022 – Present",
    location: "Auckland, New Zealand",
    highlights: [
      "Pursuing a PhD in Bioengineering with a focus on deep learning-based analysis of medical images and computational quantification of physiological parameters.",
      "Developing novel deep learning architectures for medical image segmentation and analysis, contributing to improved clinical decision-making tools.",
      "Publishing research in peer-reviewed journals and presenting at international conferences.",
    ],
    fullDescription: [
      "PhD in Bioengineering, focusing on interdisciplinary research combining medical imaging, computational quantification, and deep learning-based analysis.",
      "Developed deep learning models for medical image analysis and computational quantification of physiological parameters.",
      "Designed and validated novel neural network architectures for segmentation and classification of biomedical imaging data.",
      "Collaborated with clinical researchers to translate computational methods into practical tools for medical research.",
      "Conducted systematic literature reviews and contributed to open-source research tooling.",
    ],
    techStack: ["Python", "PyTorch", "MONAI", "Medical Imaging", "Deep Learning", "NumPy"],
    companyUrl: "https://www.auckland.ac.nz",
  },
  {
    id: "wso2",
    role: "Machine Learning Engineer",
    company: "WSO2",
    companyShort: "WSO2",
    dateRange: "2021 – 2022",
    location: "Colombo, Sri Lanka",
    highlights: [
      "Researched, engineered and deployed the AI-assisted testing feature for WSO2 Choreo — an AI-enhanced integrated platform as a service.",
      "Architected and deployed Choreo's AI-based anomaly detection system on Azure using Kubernetes, Python, and Ballerina.",
      "Identified and resolved a memory leak in the Ballerina Language Server using JMeter and Eclipse Memory Analyser, optimising resource usage across the platform.",
    ],
    fullDescription: [
      "WSO2 is one of the world's leading open-source integration vendors. Choreo is its latest product, providing an AI-enhanced integrated platform as a service.",
      "Researched, engineered and deployed the initial phase of Choreo's AI-assisted testing feature, using Python, Keras, Flask, Kubernetes and Azure DevOps pipelines.",
      "Architected, developed and deployed Choreo's AI-based anomaly detector with two other engineers, using Azure solutions, Ballerina, and Python, while adhering to security best practices, scaling requirements, and optimised resource usage.",
      "Analysed Ballerina Language Server performance and identified the cause of a memory leak using JMeter and Eclipse Memory Analyser (MAT), which helped in the optimisation of resources in Choreo.",
      "Contributed to automating the performance testing of Choreo by creating a library and a pipeline for system metrics collection using Python, Kusto, Seaborn, and Azure DevOps pipelines.",
    ],
    techStack: ["Python", "Azure", "Kubernetes", "Ballerina", "Keras", "Flask"],
    companyUrl: "https://wso2.com",
  },
  {
    id: "pearson",
    role: "Software Engineer Intern",
    company: "Pearson",
    companyShort: "Pearson",
    dateRange: "2020",
    location: "Remote",
    highlights: [
      "Contributed to the development of educational software solutions at Pearson, one of the world's largest education companies.",
      "Worked across the full stack using Java, Spring Boot, and React to build and improve features for digital learning products.",
    ],
    fullDescription: [
      "Contributed to the development of educational software solutions at Pearson, one of the world's largest education companies.",
      "Developed full-stack features using Java and Spring Boot on the backend and React on the frontend.",
      "Participated in agile development processes including sprint planning, code reviews, and daily stand-ups.",
    ],
    techStack: ["Java", "Spring Boot", "React", "JavaScript"],
    companyUrl: "https://www.pearson.com",
  },
];

export default Experience;
