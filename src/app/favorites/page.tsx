"use client";

import React, { useEffect, useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { MovieGrid } from "@/components/MovieGrid";
import { EmptyState } from "@/components/EmptyState";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering the grid on client
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="container">
        <section className={styles.header}>
          <h1 className="pageTitle">My Favorites</h1>
          <p className="pageSubtitle">Your personal list of saved movies</p>
        </section>
        <div className={styles.loadingPlaceholder}>Loading your favorites...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <section className={styles.header}>
        <h1 className="pageTitle">My Favorites</h1>
        <p className="pageSubtitle">
          {favorites.length === 1
            ? "1 movie saved to your list"
            : `${favorites.length} movies saved to your list`}
        </p>
      </section>

      {favorites.length === 0 ? (
        <EmptyState
          title="No Favorites Yet"
          message="Browse the movie discovery grid and click the heart icon on any movie card to add it to your list."
          icon="❤️"
        />
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}
