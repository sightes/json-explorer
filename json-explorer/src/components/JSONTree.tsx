"use client";

import { useState, useCallback } from "react";
import { ChevronRight, ChevronDown, Copy, Check } from "lucide-react";
import type { JSONNode } from "@/types/json";

interface JSONTreeProps {
  data: JSONNode;
  searchTerm?: string;
  onCopy: (value: string) => void;
}

function getValueColor(type: JSONNode["type"]): string {
  switch (type) {
    case "string":
      return "text-string";
    case "number":
      return "text-number";
    case "boolean":
      return "text-boolean";
    case "null":
      return "text-null";
    default:
      return "text-foreground";
  }
}

function formatValue(value: unknown, type: JSONNode["type"]): string {
  if (type === "string") return `"${value}"`;
  if (type === "null") return "null";
  return String(value);
}

function countChildren(node: JSONNode): { objects: number; arrays: number } {
  const result = { objects: 0, arrays: 0 };
  if (!node.children) return result;

  for (const child of node.children) {
    if (child.type === "object") result.objects++;
    if (child.type === "array") result.arrays++;
  }

  return result;
}

function renderCountBadge(node: JSONNode): React.ReactNode {
  if (node.type !== "object" && node.type !== "array") return null;
  if (!node.children?.length) return null;

  const counts = countChildren(node);

  if (node.type === "object") {
    const parts: string[] = [];
    if (counts.objects > 0) parts.push(`${counts.objects} keys`);
    if (counts.arrays > 0) parts.push(`${counts.arrays} arrays`);
    if (!parts.length) return null;
    const badgeText = `{${parts.join(", ")}}`;
    return (
      <span className="ml-2 px-1.5 py-0.5 text-xs bg-surface rounded border border-border-subtle text-text-muted">
        {badgeText}
      </span>
    );
  }

  const badgeText = `[${node.children.length}]`;
  return (
    <span className="ml-2 px-1.5 py-0.5 text-xs bg-surface rounded border border-border-subtle text-text-muted">
      {badgeText}
    </span>
  );
}

function highlightText(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm) return text;
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={i} className="bg-accent/30 text-accent rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

interface TreeNodeProps {
  node: JSONNode;
  depth: number;
  searchTerm?: string;
  onCopy: (value: string) => void;
  defaultExpanded?: boolean;
}

function TreeNode({
  node,
  depth,
  searchTerm,
  onCopy,
  defaultExpanded = true,
}: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const isExpandable = node.type === "object" || node.type === "array";
  const hasChildren = node.children && node.children.length > 0;

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const textToCopy =
        node.type === "object" || node.type === "array"
          ? JSON.stringify(node.value, null, 2)
          : formatValue(node.value, node.type);
      onCopy(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    },
    [node, onCopy]
  );

  const renderValue = useCallback(() => {
    if (isExpandable) {
      return (
        <>
          {hasChildren && <span className="text-text-muted text-xs ml-1">{renderCountBadge(node)}</span>}
          {!hasChildren && (
            <span className="text-text-dim text-sm ml-1">
              {node.type === "object" ? "{}" : "[]"}
            </span>
          )}
        </>
      );
    }

    return (
      <>
        <span className={`font-mono text-sm ${getValueColor(node.type)}`}>
          {highlightText(formatValue(node.value, node.type), searchTerm || "")}
        </span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 ml-1.5 p-1 rounded hover:bg-accent/10 transition-all cursor-pointer"
          title="Copy value"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-text-muted hover:text-key transition-colors" />
          )}
        </button>
      </>
    );
  }, [isExpandable, hasChildren, node, searchTerm, handleCopy, copied]);

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-surface/50 transition-colors group cursor-pointer ${
          depth > 0 ? "ml-4" : ""
        }`}
        onClick={() => isExpandable && hasChildren && setExpanded(!expanded)}
        onDoubleClick={() => isExpandable && setExpanded(!expanded)}
      >
        {isExpandable && hasChildren ? (
          expanded ? (
            <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
          )
        ) : (
          <span className="w-4 h-4 flex-shrink-0" />
        )}

        <span className="text-key-muted font-mono text-sm">
          {highlightText(node.key, searchTerm || "")}
        </span>
        <span className="text-text-dim">:</span>

        {renderValue()}
      </div>

      {isExpandable && expanded && hasChildren && (
        <div
          className="overflow-hidden"
          style={{ animation: "expand 150ms ease-out" }}
        >
          {node.children!.map((child, index) => (
            <TreeNode
              key={`${child.key}-${index}`}
              node={child}
              depth={depth + 1}
              searchTerm={searchTerm}
              onCopy={onCopy}
              defaultExpanded={Boolean(searchTerm)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function JSONTree({ data, searchTerm, onCopy }: JSONTreeProps) {
  return (
    <div className="font-mono text-sm overflow-auto p-4">
      <TreeNode node={data} depth={0} searchTerm={searchTerm} onCopy={onCopy} />
    </div>
  );
}