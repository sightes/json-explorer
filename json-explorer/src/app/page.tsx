"use client";

import { useState, useCallback, useMemo } from "react";
import { JSONInput } from "@/components/JSONInput";
import { JSONTree } from "@/components/JSONTree";
import { ToastContainer } from "@/components/Toast";
import { Header } from "@/components/page/Header";
import { SearchBar } from "@/components/page/SearchBar";
import { EmptyState } from "@/components/page/EmptyState";
import { ErrorState } from "@/components/page/ErrorState";
import type { JSONNode, ToastMessage } from "@/types/json";

function parseJSON(input: string): { data: JSONNode; error: null } | { data: null; error: string } {
  if (!input.trim()) {
    return { data: null, error: "Please enter some JSON" };
  }

  try {
    const parsed = JSON.parse(input);
    const data = buildTree("root", parsed, "");
    return { data, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Invalid JSON";
    return { data: null, error };
  }
}

function buildTree(key: string, value: unknown, path: string): JSONNode {
  const currentPath = path ? `${path}.${key}` : key;
  const type = getType(value);

  const node: JSONNode = {
    key,
    value,
    type,
    path: currentPath,
  };

  if (type === "object" && value !== null) {
    node.children = Object.entries(value as Record<string, unknown>).map(([k, v]) =>
      buildTree(k, v, currentPath)
    );
  } else if (type === "array") {
    node.children = (value as unknown[]).map((item, index) =>
      buildTree(`[${index}]`, item, currentPath)
    );
  }

  return node;
}

function getType(value: unknown): JSONNode["type"] {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  return "null";
}

function countMatches(node: JSONNode, term: string): number {
  if (!term) return 0;
  const lowerTerm = term.toLowerCase();
  let count = 0;

  if (
    node.key.toLowerCase().includes(lowerTerm) ||
    String(node.value).toLowerCase().includes(lowerTerm)
  ) {
    count++;
  }

  if (node.children) {
    for (const child of node.children) {
      count += countMatches(child, term);
    }
  }

  return count;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const { data, error } = useMemo(() => parseJSON(input), [input]);

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleCopy = useCallback(
    (value: string) => {
      navigator.clipboard.writeText(value).then(() => {
        addToast("Copied to clipboard", "success");
      });
    },
    [addToast]
  );

  const handleLoadSample = useCallback((sample: string) => {
    setInput(sample);
  }, []);

  const matchCount = useMemo(() => {
    if (!data || !searchTerm) return 0;
    return countMatches(data, searchTerm);
  }, [data, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 lg:p-6">
        <div className="w-full lg:w-2/5 h-[40vh] lg:h-auto">
          <JSONInput
            value={input}
            onChange={setInput}
            error={error}
            onLoadSample={handleLoadSample}
          />
        </div>

        <div className="w-full lg:w-3/5 flex flex-col min-h-[50vh] lg:min-h-0">
          {data && (
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              matchCount={matchCount}
            />
          )}

          <div className="flex-1 bg-surface border border-border rounded-lg overflow-auto">
            {!input.trim() ? (
              <EmptyState />
            ) : error ? (
              <ErrorState error={error} />
            ) : data ? (
              <div className="p-4">
                <JSONTree data={data} searchTerm={searchTerm} onCopy={handleCopy} />
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
