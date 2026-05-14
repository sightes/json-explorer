<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 Notes

This project uses Next.js 16 (Turbopack). APIs, conventions, and file structure differ from older versions. Read `node_modules/next/dist/docs/` for current docs. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# JSON Explorer — Project Context

## Stack
- Next.js 16 + App Router + Turbopack
- TypeScript (strict)
- Tailwind CSS v4 (no `tailwind.config.js` — config via CSS `@theme`)
- Vitest + Testing Library for tests
- Lucide React for icons

## Key Commands

```bash
make install   # npm install
make dev       # npm run dev (localhost:3000)
make build     # npm run build
make test      # npm run test
make typecheck # npx tsc --noEmit
make clean     # rm -rf .next node_modules/.cache
```

## Project Structure

```
src/
├── app/           # Next.js App Router (layout.tsx, page.tsx)
├── components/    # React components
│   ├── page/      # Page-specific (Header, SearchBar, EmptyState, ErrorState)
│   ├── JSONInput.tsx
│   ├── JSONTree.tsx
│   └── Toast.tsx
├── data/samples.ts  # Sample JSON data
├── types/json.ts    # JSONNode, ToastMessage interfaces
└── test/            # Vitest tests
```

## Conventions

- `"use client"` on all components using useState/useEffect/hooks
- CSS variables defined in `globals.css` under `@theme inline`
- Tests in `src/test/*.test.ts` — run with `npm run test:run`
- No Tailwind config file — theme extended via CSS custom properties

## Testing

```bash
npm run test        # watch mode
npm run test:run    # single run (CI)
```

## Common Issues

- Turbopack parse errors with template literals in JSX — extract complex expressions to variables
- ESLint/TypeScript config may be stricter than default — run `make typecheck` before committing