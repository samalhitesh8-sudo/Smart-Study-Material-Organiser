/**
 * Mobile Navigation Component
 * 
 * Design: Academic Minimalism
 * Provides mobile-friendly navigation and filter access for small screens.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { StudyMaterial } from "@/../../shared/types";

interface MobileNavProps {
  materials: StudyMaterial[];
}

export function MobileNav({ materials }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-0 top-0 h-screen z-40 md:hidden">
            <Sidebar materials={materials} />
          </div>
        </>
      )}
    </>
  );
}
