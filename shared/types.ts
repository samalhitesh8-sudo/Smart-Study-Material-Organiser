/**
 * Shared Types for Study Material Organizer
 * 
 * Design Philosophy: Academic Minimalism
 * These types define the core data structures for organizing study materials
 * by subject, semester, and material type.
 */

export type MaterialType = "notes" | "pyq" | "textbook" | "other";

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  subject: string;
  semester: number;
  uploadedAt: Date;
  starred: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  color: string;
  materialCount: number;
}

export interface FilterOptions {
  selectedSubject: string | null;
  selectedSemester: number | null;
  selectedType: MaterialType | null;
  searchQuery: string;
}
