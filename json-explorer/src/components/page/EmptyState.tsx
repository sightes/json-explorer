"use client";

import { Braces } from "lucide-react";

export function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-text-muted">
      <Braces className="w-12 h-12 mb-4 opacity-30" />
      <p className="text-sm">Paste JSON to get started</p>
    </div>
  );
}
