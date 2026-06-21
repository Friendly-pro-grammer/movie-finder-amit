import React from "react";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong while fetching data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.container} id="error-state-view">
      <div className={styles.card}>
        <span className={styles.icon}>⚠️</span>
        <h2 className={styles.title}>Error Occurred</h2>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;
