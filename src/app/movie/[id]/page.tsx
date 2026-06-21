import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMovieDetails } from "@/services/tmdb";

export const dynamic = "force-dynamic";
import { POSTER_SIZES, BACKDROP_SIZES } from "@/constants";
import { FavoritesButton } from "@/components/FavoritesButton";
import { ErrorState } from "@/components/ErrorState";
import styles from "./MovieDetail.module.css";

interface MovieDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailsPage({ params }: MovieDetailProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let movie;
  try {
    movie = await getMovieDetails(id);
  } catch (error) {
    console.error(`Failed to load movie details for ID ${id}`, error);
    return (
      <div className="container">
        <div className={styles.backButtonContainer}>
          <Link href="/" className={styles.backLink}>
            ← Back to Discover
          </Link>
        </div>
        <ErrorState message="Could not retrieve details for this movie. It may not exist or the network call failed." />
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `${POSTER_SIZES.lg}${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `${BACKDROP_SIZES.lg}${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "0.0";

  // Simple format for runtime: e.g. 148 min -> 2h 28m
  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return "N/A";
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className={styles.detailPageContainer} id={`movie-details-${movie.id}`}>
      {/* Backdrop Banner Graphic */}
      {backdropUrl && (
        <div className={styles.backdropWrapper}>
          <div className={styles.backdropOverlay}></div>
          <Image
            src={backdropUrl}
            alt={`${movie.title} Backdrop`}
            fill
            priority
            className={styles.backdropImage}
          />
        </div>
      )}

      <div className="container">
        <div className={styles.backButtonContainer}>
          <Link href="/" className={styles.backLink}>
            ← Back to Discover
          </Link>
        </div>

        <div className={styles.contentGrid}>
          {/* Poster Column */}
          <div className={styles.posterColumn}>
            {posterUrl ? (
              <div className={styles.posterWrapper}>
                <Image
                  src={posterUrl}
                  alt={`${movie.title} Poster`}
                  fill
                  priority
                  className={styles.posterImage}
                />
              </div>
            ) : (
              <div className={styles.placeholderPoster}>
                <span className={styles.placeholderIcon}>🎬</span>
                <span className={styles.placeholderText}>{movie.title}</span>
              </div>
            )}
          </div>

          {/* Info Details Column */}
          <div className={styles.infoColumn}>
            <div className={styles.titleHeader}>
              <h1 className={styles.movieTitle}>
                {movie.title} <span className={styles.yearAccent}>({releaseYear})</span>
              </h1>
              <div className={styles.actionWrapper}>
                {/* Use the Movie details mapped to standard Movie type for favorite list */}
                <FavoritesButton
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    overview: movie.overview,
                    genre_ids: movie.genres.map((g) => g.id),
                  }}
                />
              </div>
            </div>

            {movie.tagline && <p className={styles.tagline}>&ldquo;{movie.tagline}&rdquo;</p>}

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>★</span>
                <span className={styles.metaValue}>{rating} / 10</span>
              </div>
              <div className={styles.metaDivider}>•</div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Runtime:</span>
                <span className={styles.metaValue}>{formatRuntime(movie.runtime)}</span>
              </div>
              <div className={styles.metaDivider}>•</div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Released:</span>
                <span className={styles.metaValue}>{movie.release_date || "N/A"}</span>
              </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className={styles.genreTags}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genreTag}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.overviewSection}>
              <h2 className={styles.sectionHeading}>Overview</h2>
              <p className={styles.overviewText}>{movie.overview || "No overview available for this movie."}</p>
            </div>

            <div className={styles.additionalDetails}>
              {movie.status && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Status:</span>
                  <span className={styles.detailValue}>{movie.status}</span>
                </div>
              )}
              {movie.homepage && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Website:</span>
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.movieLink}
                  >
                    Visit Official Site ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
