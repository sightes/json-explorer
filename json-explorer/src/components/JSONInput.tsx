"use client";

import { useState, useRef, useEffect } from "react";
import { FileJson, AlertCircle, ChevronDown, Upload } from "lucide-react";
import { samples } from "@/data/samples";

interface JSONInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  onLoadSample: (sample: string) => void;
}

export function JSONInput({
  value,
  onChange,
  error,
  onLoadSample,
}: JSONInputProps) {
  const [showSamples, setShowSamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    setLineCount(value.split("\n").length);
  }, [value]);

  const handleSelectSample = (sampleValue: string) => {
    onLoadSample(sampleValue);
    setShowSamples(false);
  };

  return (
    <div className="flex flex-col h-full rounded-xl bg-surface/50 border border-border-subtle">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <FileJson className="w-4 h-4 text-key" />
          <span className="text-sm font-medium">Input</span>
          {value && !error && (
            <span className="px-1.5 py-0.5 text-xs bg-accent/10 text-accent rounded">
              Valid
            </span>
          )}
          {error && (
            <span className="px-1.5 py-0.5 text-xs bg-null/10 text-null rounded">
              Error
            </span>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowSamples(!showSamples)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-surface-elevated border border-border rounded-lg hover:border-key/30 hover:bg-border/50 transition-all cursor-pointer"
          >
            <Upload className="w-3 h-3" />
            Samples
            <ChevronDown className={`w-3 h-3 transition-transform ${showSamples ? "rotate-180" : ""}`} />
          </button>

          {showSamples && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-surface-elevated border border-border rounded-lg shadow-xl z-20 overflow-hidden animate-fade-in">
              {samples.map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => handleSelectSample(sample.value)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-accent/10 hover:text-key transition-colors cursor-pointer"
                >
                  {sample.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`relative flex-1 rounded-b-xl transition-colors ${
          error
            ? "bg-null/5"
            : value
            ? "bg-surface"
            : "bg-surface"
        }`}
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-background/50 border-r border-border-subtle flex flex-col items-center pt-3.5 text-text-dim text-xs font-mono overflow-hidden select-none">
          {Array.from({ length: Math.max(lineCount, 12) }, (_, i) => (
            <div key={i} className="h-5 leading-5">
              {i + 1}
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="{ ... }"
          className="w-full h-full pl-14 pr-4 py-3 bg-transparent font-mono text-sm resize-none focus:outline-none placeholder:text-text-dim"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-t border-border-subtle bg-null/5 text-xs text-null animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}
    </div>
  );
}