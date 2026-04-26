export interface KnowledgeArea {
  id: string;
  label: string;       // short token shown as floating fragment
  description: string; // shown in tooltip on hover
  colorKey: "emerald" | "blue" | "lavender";
}

// Sourced from CV: PhD (UoA Bioengineering), WSO2 Choreo, Pearson, Auror
const KnowledgeAreas: KnowledgeArea[] = [
  {
    id: "deep_learning",
    label: "deep_learning",
    description: "CNNs, transformers, attention mechanisms, PyTorch/Keras",
    colorKey: "emerald",
  },
  {
    id: "computer_vision",
    label: "computer_vision",
    description: "Semantic segmentation, object detection, micro-CT imaging",
    colorKey: "emerald",
  },
  {
    id: "mlops",
    label: "mlops",
    description: "Kubernetes, Azure, CI/CD pipelines, model serving",
    colorKey: "blue",
  },
  {
    id: "nlp",
    label: "nlp",
    description: "BERT, GPT-2, Q&A systems, text & flashcard classification",
    colorKey: "blue",
  },
  {
    id: "anomaly_detection",
    label: "anomaly_detection",
    description: "Streaming analytics, real-time monitoring, Azure Event Hubs",
    colorKey: "blue",
  },
  {
    id: "medical_imaging",
    label: "medical_imaging",
    description: "3D biomedical image analysis, MONAI, computational anatomy",
    colorKey: "lavender",
  },
  {
    id: "signal_processing",
    label: "signal_processing",
    description: "Speech & audio analysis, Kaldi, time-series modelling",
    colorKey: "lavender",
  },
];

export default KnowledgeAreas;
