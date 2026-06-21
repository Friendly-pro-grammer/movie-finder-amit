"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Movie } from "@/types";

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on client-side mount
  useEffect(() => {
    const initFavorites = () => {
      try {
        const stored = localStorage.getItem("movie_favorites");
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load favorites from localStorage", e);
      } finally {
        setIsInitialized(true);
      }
    };

    const timer = setTimeout(initFavorites, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to localStorage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("movie_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites, isInitialized]);

  const addFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFavorite = useCallback((movieId: number) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((m) => m.id === movieId);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
