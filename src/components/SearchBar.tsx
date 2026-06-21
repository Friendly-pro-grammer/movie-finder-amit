"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get initial value from URL query param
  const currentQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(currentQuery);
  const [prevQuery, setPrevQuery] = useState(currentQuery);

  // Sync inputs with URL changes during render (e.g. back/forward button clicks)
  if (currentQuery !== prevQuery) {
    setInputValue(currentQuery);
    setPrevQuery(currentQuery);
  }
  
  // Debounce the input value by 400ms
  const debouncedQuery = useDebounce(inputValue, 400);
  const isFirstRender = useRef(true);

  // Update the URL query params when debounced value changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const currentQueryParam = searchParams.get("query") || "";

    // If query has not changed, do nothing (preserves page navigation updates)
    if (debouncedQuery === currentQueryParam) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set("query", debouncedQuery);
    } else {
      params.delete("query");
    }
    // Always reset to page 1 on new search query
    params.set("page", "1");

    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className={styles.searchContainer} id="search-bar-container">
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for movies, genres, descriptions..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Search movies"
        />
        {inputValue && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
