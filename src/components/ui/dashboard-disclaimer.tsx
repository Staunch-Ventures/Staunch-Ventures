"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DashboardDisclaimerProps {
  title: string;
  description: React.ReactNode;
}

export function DashboardDisclaimer({ title, description }: DashboardDisclaimerProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  // The user didn't ask for a way to permanently dismiss this.
  // Showing it on every load of the dashboard layout.
  // A real app might use localStorage to hide it after the first view.

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
             <div className="space-y-4 pt-4 text-sm text-muted-foreground">{description}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsOpen(false)}>
            Got it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
