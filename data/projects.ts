/**
 * TO POPULATE THIS SECTION:
 * Add your real projects to the array below.
 *
 * Schema fields:
 *   id           — unique slug (e.g. "anomaly-detector")
 *   title        — project name (clear, keyword-rich)
 *   description  — one sentence summary shown on cards
 *   longDescription — full description for the detail page (optional)
 *   techStack    — array of technology names
 *   githubUrl    — link to GitHub repo (optional)
 *   liveUrl      — link to live demo/deployment (optional)
 *   featured     — set true on up to 3 projects to show on the home page preview
 *   status       — "Live" | "Research" | "Archived"
 *
 * Once populated, replace <ComingSoon> in app/projects/page.tsx with <ProjectsGrid>.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: "Live" | "Research" | "Archived";
}

const Projects: Project[] = [
  {
    id: "ai-anomaly-detection",
    title: "AI-Based Anomaly Detection for WSO2 Choreo",
    description:
      "Production-grade anomaly detection system deployed on Azure Kubernetes Service to monitor Choreo platform metrics at scale.",
    longDescription:
      "Architected and deployed an AI-based anomaly detection microservice for WSO2 Choreo. Built with Python and Azure services, the system monitors platform metrics in real time and flags anomalous behaviour using statistical and machine learning methods. Deployed on Kubernetes with automated Azure DevOps pipelines.",
    techStack: ["Python", "Azure", "Kubernetes", "Ballerina", "Azure DevOps"],
    featured: true,
    status: "Live",
  },
  {
    id: "ai-assisted-testing",
    title: "AI-Assisted Testing Feature for Choreo iPaaS",
    description:
      "End-to-end ML pipeline for generating and evaluating automated test cases for API integrations on the Choreo platform.",
    longDescription:
      "Researched, engineered and deployed the initial phase of Choreo's AI-assisted testing feature. The system uses deep learning models (Keras) served via Flask APIs on Kubernetes to generate test cases for user APIs. Integrated with Azure DevOps pipelines for continuous deployment.",
    techStack: ["Python", "Keras", "Flask", "Kubernetes", "Azure DevOps"],
    featured: true,
    status: "Live",
  },
  {
    id: "medical-image-analysis",
    title: "Deep Learning for Medical Image Analysis",
    description:
      "Research project developing deep learning models for segmentation and quantification of physiological parameters from biomedical images.",
    longDescription:
      "PhD research project combining bioengineering, medical imaging, and deep learning. Developed novel neural network architectures for medical image segmentation using PyTorch and MONAI. Research targets improved computational tools for clinical analysis.",
    techStack: ["Python", "PyTorch", "MONAI", "NumPy", "Medical Imaging"],
    featured: true,
    status: "Research",
  },
];

export default Projects;
