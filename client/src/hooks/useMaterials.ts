/**
 * Custom Hook: useMaterials
 * 
 * Manages study materials state with localStorage persistence.
 * Provides CRUD operations for materials and filtering capabilities.
 */

import { useState, useEffect, useCallback } from "react";
import { StudyMaterial, MaterialType } from "@/../../shared/types";

const STORAGE_KEY = "study_materials";

export function useMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load materials from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const materialsWithDates = parsed.map((m: any) => ({
          ...m,
          uploadedAt: new Date(m.uploadedAt),
        }));
        setMaterials(materialsWithDates);
      } catch (error) {
        console.error("Failed to load materials from localStorage:", error);
      }
    } else {
      // Initialize with sample data
      setMaterials(getDefaultMaterials());
    }
    setIsLoaded(true);
  }, []);

  // Save materials to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
    }
  }, [materials, isLoaded]);

  const addMaterial = useCallback(
    (material: Omit<StudyMaterial, "id" | "uploadedAt">) => {
      const newMaterial: StudyMaterial = {
        ...material,
        id: `mat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        uploadedAt: new Date(),
      };
      setMaterials((prev) => [newMaterial, ...prev]);
      return newMaterial;
    },
    []
  );

  const deleteMaterial = useCallback((id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggleStar = useCallback((id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
  }, []);

  const updateMaterial = useCallback((id: string, updates: Partial<StudyMaterial>) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }, []);

  const getMaterialsBySubject = useCallback(
    (subject: string) => {
      return materials.filter((m) => m.subject === subject);
    },
    [materials]
  );

  const getMaterialsByType = useCallback(
    (type: MaterialType) => {
      return materials.filter((m) => m.type === type);
    },
    [materials]
  );

  const searchMaterials = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return materials.filter(
        (m) =>
          m.title.toLowerCase().includes(lowerQuery) ||
          m.description.toLowerCase().includes(lowerQuery) ||
          m.subject.toLowerCase().includes(lowerQuery)
      );
    },
    [materials]
  );

  return {
    materials,
    isLoaded,
    addMaterial,
    deleteMaterial,
    toggleStar,
    updateMaterial,
    getMaterialsBySubject,
    getMaterialsByType,
    searchMaterials,
  };
}

function getDefaultMaterials(): StudyMaterial[] {
  return [
    {
      id: "mat_1",
      title: "Linear Algebra Lecture Notes - Week 1",
      description: "Comprehensive notes covering vectors and matrices",
      type: "notes",
      subject: "Linear Algebra",
      semester: 1,
      uploadedAt: new Date("2026-03-20"),
      starred: true,
    },
    {
      id: "mat_2",
      title: "Data Structures Previous Year Question Paper 2024",
      description: "PYQ with solutions for midterm exam",
      type: "pyq",
      subject: "Data Structures",
      semester: 2,
      uploadedAt: new Date("2026-03-18"),
      starred: false,
    },
    {
      id: "mat_3",
      title: "Physics Textbook - Chapter 5: Thermodynamics",
      description: "Reference material for thermodynamics concepts",
      type: "textbook",
      subject: "Physics",
      semester: 1,
      uploadedAt: new Date("2026-03-15"),
      starred: false,
    },
    {
      id: "mat_4",
      title: "Chemistry Lab Report Template",
      description: "Standard format for lab reports",
      type: "other",
      subject: "Chemistry",
      semester: 1,
      uploadedAt: new Date("2026-03-10"),
      starred: false,
    },
    {
      id: "mat_5",
      title: "Calculus Problem Set Solutions",
      description: "Solutions to problem set 3 with detailed explanations",
      type: "notes",
      subject: "Calculus",
      semester: 1,
      uploadedAt: new Date("2026-03-08"),
      starred: true,
    },
  ];
}
