"use client";

import { Braces } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface/30 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <Braces className="w-5 h-5 text-key" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight">JSON Explorer</h1>
          <span className="text-xs text-text-muted">Visualize & explore</span>
        </div>
      </div>
    </header>
  );
}