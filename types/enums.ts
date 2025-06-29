export const Province = {
    LIMA: 'LIMA',
    OTHER: 'OTHER',
} as const;

export type Province = keyof typeof Province;

export const LawyerSpecialization = {
    CRIMINAL: "CRIMINAL",
    CIVIL: "CIVIL",
    FAMILY: "FAMILY",
    LABOR: "LABOR",
    CONSTITUTIONAL: "CONSTITUTIONAL",
    COMMERCIAL: "COMMERCIAL",
    PROCEDURAL: "PROCEDURAL",
    ADMINISTRATIVE: "ADMINISTRATIVE",
    TAX: "TAX",
    INTERNATIONAL: "INTERNATIONAL",
    ENVIRONMENTAL: "ENVIRONMENTAL",
    PRIVATE_INTERNATIONAL: "PRIVATE_INTERNATIONAL",
} as const;

export type LawyerSpecialization = keyof typeof LawyerSpecialization;
