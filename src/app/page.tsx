import React, { Suspense } from "react";
import { getPopularMovies, searchMovies } from "@/services/tmdb";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { Pagination } from "@/components/Pagination";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";

interface PageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

// Separate data fetching container to leverage React Suspense
async function MovieListContainer({ query, page }: { query: string; page: number }) {
  let data;
  let hasError = false;

  try {
    data = query
      ? await searchMovies(query, page)
      : await getPopularMovies(page);
  } catch (error) {
    console.error("Error in MovieListContainer loading movies:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <ErrorState
        message="We encountered an issue loading movies from TMDB. Please check your API key setup or connection."
      />
    );
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <EmptyState
        title={query ? "No Search Results" : "No Movies Available"}
        message={
          query
            ? `We couldn't find any movies matching "${query}". Check your spelling or try another term.`
            : "We couldn't retrieve any movies at this moment. Please check back later."
        }
        icon="🎬"
      />
    );
  }

  return (
    <>
      <MovieGrid movies={data.results} />
      <Pagination currentPage={page} totalPages={data.totalPages} />
    </>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query || "";
  const page = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;

  return (
    <div className="container">
      <section className="hero">
        <h1 className="pageTitle">Discover Movies</h1>
        <p className="pageSubtitle">
          Search for your favorite movies, explore details, and save your favorites list.
        </p>
        <SearchBar />
      </section>

      {/* Re-trigger Suspense when query or page search params change */}
      <Suspense key={`${query}-${page}`} fallback={<LoadingSkeleton type="grid" />}>
        <MovieListContainer query={query} page={page} />
      </Suspense>
    </div>
  );
}
