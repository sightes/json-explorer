"use client";

import { Search, X, Braces } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  matchCount: number;
}

export function SearchBar({ searchTerm, onSearchChange, matchCount }: SearchBarProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Braces className="w-4 h-4 text-text-muted" />
        <h2 className="text-sm font-medium text-foreground">Tree View</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search keys & values..."
          className="pl-9 pr-8 py-2 text-sm bg-surface border border-border rounded-lg w-64 focus:outline-none focus:border-key/50"
        />
        {searchTerm && (
          <>
            <span className="absolute right-20 top-1/2 -translate-y-1/2 text-xs bg-key/20 text-key px-2 py-0.5 rounded">
              {matchCount} match{matchCount !== 1 ? "es" : ""}
            </span>
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-border rounded"
            >
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
