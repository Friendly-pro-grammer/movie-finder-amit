"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    startTransition(() => {
      // Use router.push or replace, keeping scroll position at top of container
      router.push(`/?${params.toString()}`);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.paginationContainer} id="pagination-control">
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isPending}
        aria-label="Previous Page"
      >
        ← Previous
      </button>

      <span className={styles.pageInfo} aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isPending}
        aria-label="Next Page"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
