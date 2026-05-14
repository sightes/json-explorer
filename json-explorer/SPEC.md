# JSON Explorer - Specification

## Concept & Vision

A sleek, developer-focused JSON explorer that feels like a modern IDE's variable inspector. The interface combines a dark terminal aesthetic with syntax-highlighted tree visualization, making complex JSON structures feel approachable and navigable. Built for developers who work with APIs, configs, and data daily.

## Design Language

**Aesthetic**: Dark terminal meets modern IDE — deep backgrounds with vibrant syntax highlighting that makes JSON structures visually parseable at a glance.

**Color Palette**:
- Background: `#0a0a0f` (deep void)
- Surface: `#12121a` (elevated panels)
- Border: `#2a2a3a` (subtle separation)
- Text Primary: `#e4e4e7` (zinc-200)
- Text Muted: `#71717a` (zinc-500)
- String: `#a5d6ff` (soft blue)
- Number: `#ffa657` (warm orange)
- Boolean: `#c4b5fd` (violet)
- Null: `#f87171` (red)
- Key: `#86efac` (green)

**Typography**:
- UI: `Geist Sans` (clean, modern)
- Code: `Geist Mono` (monospace for JSON)

**Motion**:
- Tree expand/collapse: 200ms ease-out with height animation
- Copy feedback: quick 150ms scale pulse
- Search highlights: 100ms background fade

## Layout & Structure

1. **Header Bar**: App title + sample JSON loader + theme toggle placeholder
2. **Input Panel** (left 40%): Textarea for pasting JSON with line numbers, validate button
3. **Tree Panel** (right 60%): Interactive JSON tree with expand/collapse, search bar at top
4. **Responsive**: Stacks vertically on mobile (< 768px), input becomes collapsible accordion

## Features & Interactions

### Core Features
- **JSON Input**: Large textarea with monospace font, line numbers, paste or type JSON
- **Validation**: Instant validation on input, shows error message with line/position if invalid
- **Tree View**: Hierarchical tree with:
  - Expand/collapse individual nodes (click arrow or double-click key)
  - Expand all / Collapse all buttons
  - Object and array count badges `{3}` `[5]`
- **Search**: Filter tree nodes by key name or value, highlights matches, shows count
- **Copy**: Click any value to copy to clipboard, shows toast notification
- **Sample Data**: Load example JSON (API response, config file, nested object)

### Interactions
- Invalid JSON: Red border on input, error toast with details
- Empty state: Friendly illustration + "Paste JSON to get started"
- Copy: Click value → copied badge appears for 1.5s
- Search no results: "No matches found" message

## Component Inventory

### JSONInput
- Textarea with line numbers overlay
- States: empty (placeholder), valid (green border), invalid (red border + error message)
- "Load Sample" dropdown button

### JSONTree
- Recursive tree component
- Each node: expand arrow, key name (green), colon, value (colored by type)
- Array indices shown as `[0]`, `[1]`
- Expand/collapse icons: `▶` / `▼`
- Copy button on hover over values

### SearchBar
- Input with search icon
- Clear button when has value
- Results count badge

### Toast
- Slides in from bottom-right
- Auto-dismiss after 2s
- Types: success (copy), error (invalid JSON)

## Technical Approach

- **Framework**: Next.js 14+ App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom theme
- **State**: React hooks (useState for local state)
- **Icons**: Lucide React
- **Fonts**: Geist (via next/font)
- **No external JSON parsing library** — use native `JSON.parse` with error handling
