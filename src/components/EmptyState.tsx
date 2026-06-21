import React from "react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
}

export function EmptyState({
  title = "No Results Found",
  message = "Try searching for another movie title, keyword, or check back later.",
  icon = "🔍",
}: EmptyStateProps) {
  return (
    <div className={styles.container} id="empty-state-view">
      <div className={styles.card}>
        <span className={styles.icon}>{icon}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}

export default EmptyState;
