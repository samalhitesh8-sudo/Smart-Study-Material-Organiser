/**
 * Sidebar Navigation Component
 * 
 * Design: Academic Minimalism
 * Displays subjects and filtering options with clear visual hierarchy.
 * Features smooth transitions and keyboard accessibility.
 */

import { useState, useMemo } from "react";
import { StudyMaterial, MaterialType } from "@/../../shared/types";
import { useFilters } from "@/contexts/FilterContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ChevronDown } from "lucide-react";

interface SidebarProps {
  materials: StudyMaterial[];
}

export function Sidebar({ materials }: SidebarProps) {
  const { filters, setSelectedSubject, setSelectedSemester, setSelectedType, clearFilters } =
    useFilters();
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);

  // Get unique subjects grouped by semester
  const subjectsBySemester = useMemo(() => {
    const grouped: Record<number, Set<string>> = {};
    materials.forEach((m) => {
      if (!grouped[m.semester]) {
        grouped[m.semester] = new Set();
      }
      grouped[m.semester].add(m.subject);
    });

    const result: Record<number, string[]> = {};
    Object.entries(grouped).forEach(([sem, subjects]) => {
      result[Number(sem)] = Array.from(subjects).sort();
    });
    return result;
  }, [materials]);

  const semesters = Object.keys(subjectsBySemester)
    .map(Number)
    .sort((a, b) => a - b);

  const materialTypes: MaterialType[] = ["notes", "pyq", "textbook", "other"];

  const hasActiveFilters =
    filters.selectedSubject ||
    filters.selectedSemester ||
    filters.selectedType ||
    filters.searchQuery;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-bold text-lg text-sidebar-foreground mb-2">
          Filters
        </h2>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1">
        {/* Search Section - Hidden on mobile */}
        <div className="hidden md:block p-4 border-b border-sidebar-border">
          <label className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wide block mb-2">
            Search
          </label>
          <Input
            placeholder="Search materials..."
            className="text-sm"
            value={filters.searchQuery}
            onChange={(e) => {
              // Search is handled in parent, but we show it here for context
            }}
          />
        </div>

        {/* Material Types */}
        <div className="p-3 md:p-4 border-b border-sidebar-border">
          <label className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wide block mb-2 md:mb-3">
            Type
          </label>
          <div className="space-y-2">
            {materialTypes.map((type) => (
              <button
                key={type}
                onClick={() =>
                  setSelectedType(filters.selectedType === type ? null : type)
                }
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  filters.selectedType === type
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {type === "notes"
                  ? "📝 Notes"
                  : type === "pyq"
                    ? "📚 Previous Year Questions"
                    : type === "textbook"
                      ? "📖 Textbooks"
                      : "📎 Other"}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects by Semester */}
        <div className="p-3 md:p-4">
          <label className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wide block mb-2 md:mb-3">
            Subjects
          </label>
          <div className="space-y-2">
            {semesters.map((semester) => (
              <div key={semester}>
                <button
                  onClick={() =>
                    setExpandedSemester(
                      expandedSemester === semester ? null : semester
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-2 rounded text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <span>Semester {semester}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedSemester === semester ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedSemester === semester && (
                  <div className="ml-2 mt-2 space-y-1 border-l border-sidebar-border pl-2">
                    {subjectsBySemester[semester].map((subject) => (
                      <button
                        key={subject}
                        onClick={() =>
                          setSelectedSubject(
                            filters.selectedSubject === subject ? null : subject
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          filters.selectedSubject === subject
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
