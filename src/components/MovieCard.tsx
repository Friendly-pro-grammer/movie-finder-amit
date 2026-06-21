import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types";
import { POSTER_SIZES } from "@/constants";
import { FavoritesButton } from "./FavoritesButton";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  
  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "0.0";

  const posterUrl = movie.poster_path
    ? `${POSTER_SIZES.md}${movie.poster_path}`
    : null;

  return (
    <Link href={`/movie/${movie.id}`} className={styles.card} id={`movie-card-${movie.id}`}>
      <div className={styles.imageContainer}>
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={`${movie.title} Poster`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.poster}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholderPoster}>
            <span className={styles.placeholderIcon}>🎬</span>
            <span className={styles.placeholderText}>{movie.title}</span>
          </div>
        )}
        <div className={styles.favoriteWrapper}>
          <FavoritesButton movie={movie} />
        </div>
        <div className={styles.ratingBadge}>
          <span className={styles.starIcon}>★</span> {rating}
        </div>
      </div>
      <div className={styles.details}>
        <h3 className={styles.title} title={movie.title}>{movie.title}</h3>
        <p className={styles.year}>{releaseYear}</p>
      </div>
    </Link>
  );
}

// Memory optimization
export default React.memo(MovieCard);
