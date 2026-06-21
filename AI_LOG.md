# AI Generation Log

### Tools Used

* **Gemini 3.5 Flash (Medium)**: Primary AI Coding Assistant (Antigravity Agent)
* **Next.js CLI Developer Toolchain**: Automated routing and compiler generation checks
* **ESLint Static Analysis Engine**: Source code lint compliance checking

### Best Prompts

#### Prompt 1: Project Architecture Scaffolding
> "Bootstrap a TypeScript Next.js App Router project in the current directory. Setup absolute path mappings using `@/*` referencing the `src/` directory. Configure support for custom Global CSS styling and standard module structures under `src/components/`, `src/hooks/`, `src/services/`, `src/types/`, `src/utils/`, and `src/constants/`."
* *Why it worked*: Providing exact directories and conventions in the initial prompt ensured that standard folder structure structures and import aliases were automatically established without manual re-organization.

#### Prompt 2: exact 12-Item TMDB Pagination Slicing
> "Write a TMDB API service layer that maps the API responses to local schemas. TMDB returns 20 movies per page, but the application requires exactly 12 movies per page. Write a function that translates page parameters by retrieving the required TMDB pages (e.g. pages N and N+1 if overlapping), merges their items, slices the exact 12-item range, and correctly recalculates total pages."
* *Why it worked*: This detailed description specified the math logic for fetching overlapping TMDB pages. The resulting algorithm correctly sliced results with zero off-by-one errors.

#### Prompt 3: Synced Input State Syncing
> "Write a controlled SearchBar input component that updates the search results as the user types. Use a custom hook to debounce input changes. Sync the input value and search state directly to the Next.js router URL query parameters so that the URL remains shareable and back/forward navigation is supported without layout resets."
* *Why it worked*: Specifying state synchronization and router parameters forced the generation of URL state management, which enabled deep-link support and robust browser history interaction.

### What I Fixed Manually

* **ESLint React-Hooks/Error-Boundaries Violations**: We manually refactored `MovieListContainer` inside `src/app/page.tsx` because ESLint flagged rendering JSX directly inside `try/catch` statements. We isolated the asynchronous data-fetching inside the `try/catch` block and returned the JSX fragments (`MovieGrid` and `Pagination`) only after the block had resolved successfully.
* **ESLint Synchronous State-Updates in Effects**: We resolved strict errors where ESLint flagged `setFavoriteCount`, `setInputValue`, and `setFavorites` inside synchronous `useEffect` blocks. We fixed this by setting hydration/mounting flags asynchronously using deferred `setTimeout` microtask callbacks, and by computing state updates directly during rendering instead of relying on synchronizing effects.
* **TypeScript dynamic imports linting error**: We fixed `@typescript-eslint/no-explicit-any` errors by removing dynamic runtime `any` type casting on the imported `freekeys` module and defining native typings for the library inside [freekeys.d.ts](file:///c:/Users/mrami/Desktop/assignment/src/types/freekeys.d.ts).
