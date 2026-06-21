import React from "react";
import styles from "./LoadingSkeleton.module.css";

interface LoadingSkeletonProps {
  type?: "grid" | "detail";
  count?: number;
}

export function LoadingSkeleton({ type = "grid", count = 12 }: LoadingSkeletonProps) {
  if (type === "detail") {
    return (
      <div className={styles.detailSkeleton} id="detail-skeleton">
        <div className={`${styles.skeleton} ${styles.posterSkeleton}`}></div>
        <div className={styles.detailInfoSkeleton}>
          <div className={`${styles.skeleton} ${styles.titleSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.metaSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.overviewTitleSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.overviewTextSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.overviewTextSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.overviewTextSkeleton}`}></div>
        </div>
      </div>
    );
  }

  // Render a grid of cards
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div className={styles.gridSkeleton} id="grid-skeleton">
      {items.map((item) => (
        <div key={item} className={styles.cardSkeleton}>
          <div className={`${styles.skeleton} ${styles.imageSkeleton}`}></div>
          <div className={styles.detailsSkeleton}>
            <div className={`${styles.skeleton} ${styles.textSkeleton} ${styles.cardTitleSkeleton}`}></div>
            <div className={`${styles.skeleton} ${styles.textSkeleton} ${styles.cardYearSkeleton}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
