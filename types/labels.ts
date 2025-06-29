import { LawyerSpecialization, Province } from './enums';

export const SPECIALIZATION_LABELS: Record<keyof typeof LawyerSpecialization, string> = {
    CRIMINAL: "Derecho Penal",
    CIVIL: "Derecho Civil",
    FAMILY: "Derecho de Familia",
    LABOR: "Derecho Laboral",
    CONSTITUTIONAL: "Derecho Constitucional",
    COMMERCIAL: "Derecho Comercial",
    TAX: "Derecho Tributario",
    PROCEDURAL: "Derecho Procesal",
    ADMINISTRATIVE: "Derecho Administrativo",
    INTERNATIONAL: "Derecho Internacional",
    ENVIRONMENTAL: "Derecho Ambiental",
    PRIVATE_INTERNATIONAL: "Derecho Internacional Privado",
};

export const PROVINCE_LABELS: Record<keyof typeof Province, string> = {
    LIMA: "Lima",
    OTHER: "Otra",
};
