import React from "react";
import { Movie } from "@/types";
import { MovieCard } from "./MovieCard";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className={styles.grid} id="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
