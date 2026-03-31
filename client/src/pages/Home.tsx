/**
 * Home Page - Main Dashboard
 * 
 * Design: Academic Minimalism
 * Central hub for viewing, searching, and managing study materials.
 * Features sidebar navigation, search bar, and material grid.
 */

import { useState, useMemo } from "react";
import { useMaterials } from "@/hooks/useMaterials";
import { useFilters } from "@/contexts/FilterContext";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { MaterialType, StudyMaterial } from "@/../../shared/types";

export default function Home() {
  const {
    materials,
    isLoaded,
    addMaterial,
    deleteMaterial,
    toggleStar,
    searchMaterials,
  } = useMaterials();

  const { filters, setSearchQuery } = useFilters();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "notes" as MaterialType,
    subject: "",
    semester: "1",
  });

  // Filter materials based on active filters
  const filteredMaterials = useMemo(() => {
    let result = materials;

    // Apply search
    if (filters.searchQuery) {
      result = searchMaterials(filters.searchQuery);
    }

    // Apply subject filter
    if (filters.selectedSubject) {
      result = result.filter((m) => m.subject === filters.selectedSubject);
    }

    // Apply type filter
    if (filters.selectedType) {
      result = result.filter((m) => m.type === filters.selectedType);
    }

    // Apply semester filter
    if (filters.selectedSemester) {
      result = result.filter((m) => m.semester === filters.selectedSemester);
    }

    // Sort: starred first, then by date
    return result.sort((a, b) => {
      if (a.starred !== b.starred) {
        return a.starred ? -1 : 1;
      }
      return (
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
    });
  }, [materials, filters, searchMaterials]);

  const handleAddMaterial = () => {
    if (!formData.title.trim() || !formData.subject.trim()) {
      toast.error("Please fill in title and subject");
      return;
    }

    addMaterial({
      title: formData.title,
      description: formData.description,
      type: formData.type,
      subject: formData.subject,
      semester: parseInt(formData.semester),
      starred: false,
    });

    toast.success("Material added successfully!");
    setFormData({
      title: "",
      description: "",
      type: "notes",
      subject: "",
      semester: "1",
    });
    setIsAddDialogOpen(false);
  };

  const stats = useMemo(() => {
    return {
      total: materials.length,
      starred: materials.filter((m) => m.starred).length,
      subjects: new Set(materials.map((m) => m.subject)).size,
    };
  }, [materials]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Navigation */}
      <MobileNav materials={materials} />

      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar materials={materials} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  Study Materials
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Organize and access your learning resources
                </p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4" />
                    Add Material
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Study Material</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Linear Algebra Lecture Notes"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Brief description of the material"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="e.g., Linear Algebra"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Material Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              type: value as MaterialType,
                            })
                          }
                        >
                          <SelectTrigger id="type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="notes">Notes</SelectItem>
                            <SelectItem value="pyq">PYQ</SelectItem>
                            <SelectItem value="textbook">Textbook</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="semester">Semester</Label>
                        <Select
                          value={formData.semester}
                          onValueChange={(value) =>
                            setFormData({ ...formData, semester: value })
                          }
                        >
                          <SelectTrigger id="semester">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                              <SelectItem key={sem} value={String(sem)}>
                                Sem {sem}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      onClick={handleAddMaterial}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Add Material
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              <div className="p-2 md:p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1 line-clamp-1">
                  Total
                </p>
                <p className="text-xl md:text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <div className="p-2 md:p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1 line-clamp-1">
                  Starred
                </p>
                <p className="text-xl md:text-2xl font-bold text-accent">
                  {stats.starred}
                </p>
              </div>
              <div className="hidden md:block p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                  Subjects
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.subjects}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 md:px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-10 text-sm"
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Materials Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {filteredMaterials.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-96">
              <div className="text-center px-4">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  No materials found
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {materials.length === 0
                    ? "Start by adding your first study material"
                    : "Try adjusting your filters or search query"}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onDelete={deleteMaterial}
                  onToggleStar={toggleStar}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
