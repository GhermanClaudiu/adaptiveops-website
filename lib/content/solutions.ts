export interface Solution {
  id: string;
  name: string;
  fullName: string;
  description: string;
  features: string[];
}

export const solutions: Solution[] = [
  {
    id: "ems",
    name: "EMS",
    fullName: "Equipment Management System",
    description:
      "A digital solution for managing industrial equipment lifecycle, maintenance planning and compliance tracking.",
    features: [
      "Equipment management",
      "Maintenance planning",
      "Calibration management",
      "Equipment documentation",
      "Audit history",
    ],
  },
  {
    id: "qms",
    name: "QMS",
    fullName: "Quality Management System",
    description:
      "A digital quality management platform for document control, nonconformity tracking and audit management.",
    features: [
      "Document management",
      "Nonconformity management",
      "CAPA management",
      "Audit management",
      "Process traceability",
    ],
  },
];
