"use client";

import { SearchX } from "lucide-react";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-red-400">
      <SearchX className="w-12 h-12 mb-4 opacity-50" />
      <p className="text-sm font-medium">Invalid JSON</p>
      <p className="text-xs text-text-muted mt-1">{error}</p>
    </div>
  );
}
