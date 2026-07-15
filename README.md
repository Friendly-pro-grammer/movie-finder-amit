# Movie Discovery Application

A production-ready Movie Discovery Application built using **Next.js (App Router)**, **TypeScript**, and the **TMDB API**. This project delivers a high-fidelity, responsive interface with search debouncing, custom pagination, and local persistence for favorited movies.

## Developer Info
* **Developer Name**: Amit Yadav


---

## Features

1. **Responsive Grid Layout**: Standardized layout with dark mode slate aesthetics using Vanilla CSS.
2. **Search with Debouncing**: Searches TMDB movies as the user types (with a 400ms debounce delay).
3. **Exact 12-Item Pagination**: Custom pagination layer translating TMDB's 20-item pages into exactly 12-item app pages.
4. **Detailed Movie Page**: Clean nested route (`/movie/[id]`) showing banner backdrop, poster, rating, runtime, overview, and genre tags.
5. **Dynamic Favorites**: Save or unsave movies directly to a local watchlist using `localStorage`. Keeps state synced dynamically.
6. **Graceful Error & Loading Fallbacks**: Dynamic pulsing skeleton loaders and detailed empty/error pages.
7. **Mock Database Fallback**: Runs out-of-the-box with simulated data if TMDB API keys are omitted.

---

## Architecture & Project Structure

The project has been structured according to clean architecture principles:

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Custom CSS tokens & global resets
│   ├── layout.tsx          # App Shell layout with Navbar/Footer
│   ├── page.tsx            # Main Discovery Page (Server Component)
│   ├── favorites/          # Favorites Page route
│   └── movie/[id]/         # Dynamic Movie details route
├── components/             # Reusable UI components
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── MovieGrid.tsx
│   ├── MovieCard.tsx
│   ├── Pagination.tsx
│   ├── FavoritesButton.tsx
│   ├── LoadingSkeleton.tsx
│   ├── ErrorState.tsx
│   └── EmptyState.tsx
├── hooks/                  # Custom state & side-effect hooks
│   ├── useDebounce.ts
│   └── useFavorites.tsx
├── services/               # API Data integrations
│   └── tmdb.ts             # Fetch clients & pagination offset layer
├── types/                  # Type-safe model contracts
│   └── index.ts
└── constants/              # Scaling sizes & static configs
    └── index.ts
```

---

## Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18.x or later)** and **npm** installed on your system.

### 2. Install Dependencies
Clone the repository, navigate to the folder, and run:
```bash
npm install
```

### 3. Environment Variables Setup
Create a `.env.local` file in the root of the project and specify your TMDB API Key:
```env
# TMDB API Configuration
# Option A: Server-only configuration (Recommended for server components)
TMDB_API_KEY=your_tmdb_api_key_here

# Option B: Client-exposed configuration (Fallback if required)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```
> **Note**: If you don't configure a key, the application will automatically run in a **fully-functional mock database mode** using local mock files.

### 4. Running the Development Server
Start the local server by running:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 5. Build Commands
To generate a compiled production-ready bundle of the application, compile TypeScript, and verify ESLint rules:
```bash
npm run build
```

To run the built bundle locally:
```bash
npm run start
```

### 6. Lint Verification
To run the ESLint static checker:
```bash
npm run lint
```

---

## Performance & Optimization Actions

* **React.memo Usage**: Heavy list item items (`MovieCard`) are wrapped in `React.memo` to restrict re-renders to instances where props change.
* **Server Components**: The main Home view (`/`) and Detail views (`/movie/[id]`) are Server Components, shifting layout data retrieval and formatting execution to the server.
* **Suspense & Code Splitting**: Main layouts load async data-fetching sub-components inside React Suspense boundaries keyed on route search params, showing pulse loader grids smoothly.
* **Local Storage Optimization**: We cache favorite metadata directly in local storage, eliminating the need to execute details queries when loading the `/favorites` list.
