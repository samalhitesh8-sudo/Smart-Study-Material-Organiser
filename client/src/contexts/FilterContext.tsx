/**
 * Filter Context
 * 
 * Manages global filter state for the application.
 * Allows users to filter materials by subject, semester, type, and search query.
 */

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FilterOptions, MaterialType } from "@/../../shared/types";

interface FilterContextType {
  filters: FilterOptions;
  setSelectedSubject: (subject: string | null) => void;
  setSelectedSemester: (semester: number | null) => void;
  setSelectedType: (type: MaterialType | null) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterOptions>({
    selectedSubject: null,
    selectedSemester: null,
    selectedType: null,
    searchQuery: "",
  });

  const setSelectedSubject = (subject: string | null) => {
    setFilters((prev) => ({ ...prev, selectedSubject: subject }));
  };

  const setSelectedSemester = (semester: number | null) => {
    setFilters((prev) => ({ ...prev, selectedSemester: semester }));
  };

  const setSelectedType = (type: MaterialType | null) => {
    setFilters((prev) => ({ ...prev, selectedType: type }));
  };

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const clearFilters = () => {
    setFilters({
      selectedSubject: null,
      selectedSemester: null,
      selectedType: null,
      searchQuery: "",
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setSelectedSubject,
        setSelectedSemester,
        setSelectedType,
        setSearchQuery,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}
