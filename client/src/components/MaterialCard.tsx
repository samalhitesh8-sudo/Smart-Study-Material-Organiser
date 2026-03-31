/**
 * Material Card Component
 * 
 * Design: Academic Minimalism
 * Displays a single study material with metadata, actions, and visual hierarchy.
 * Features smooth hover effects and clear typography.
 */

import { StudyMaterial, MaterialType } from "@/../../shared/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Trash2,
  Star,
  FileText,
  BookOpen,
  HelpCircle,
  Bookmark,
} from "lucide-react";
import { format } from "date-fns";

interface MaterialCardProps {
  material: StudyMaterial;
  onDelete: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export function MaterialCard({
  material,
  onDelete,
  onToggleStar,
}: MaterialCardProps) {
  const getTypeIcon = (type: MaterialType) => {
    switch (type) {
      case "notes":
        return <FileText className="w-4 h-4" />;
      case "pyq":
        return <BookOpen className="w-4 h-4" />;
      case "textbook":
        return <Bookmark className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: MaterialType) => {
    switch (type) {
      case "notes":
        return "Notes";
      case "pyq":
        return "PYQ";
      case "textbook":
        return "Textbook";
      default:
        return "Other";
    }
  };

  return (
    <Card className="p-3 md:p-4 hover:shadow-md transition-shadow duration-200 border border-border">
      <div className="flex flex-col justify-between items-start gap-3">
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-muted-foreground">
              {getTypeIcon(material.type)}
            </span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {getTypeLabel(material.type)}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              Sem {material.semester}
            </span>
          </div>

          <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-xs md:text-sm">
            {material.title}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-1 md:line-clamp-2 mb-2 md:mb-3">
            {material.description}
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
            <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
              {material.subject}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(material.uploadedAt), "MMM d")}
            </span>
          </div>
        </div>

        <div className="flex gap-1 flex-shrink-0 self-end md:self-auto mt-2 md:mt-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStar(material.id)}
            className="h-7 w-7 md:h-8 md:w-8 p-0"
            title={material.starred ? "Remove from starred" : "Add to starred"}
          >
            <Star
              className="w-3 h-3 md:w-4 md:h-4"
              fill={material.starred ? "currentColor" : "none"}
              color={material.starred ? "oklch(0.72 0.15 70)" : "currentColor"}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(material.id)}
            className="h-7 w-7 md:h-8 md:w-8 p-0 text-destructive hover:text-destructive"
            title="Delete material"
          >
            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
