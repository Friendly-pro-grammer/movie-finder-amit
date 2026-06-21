"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";
import styles from "./Navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const favoriteCount = isMounted ? favorites.length : 0;

  return (
    <nav className={styles.navbar} id="app-navbar">
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoAccent}>🎬</span> MovieFinder
        </Link>
        <div className={styles.navLinks}>
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
          >
            Discover
          </Link>
          <Link
            href="/favorites"
            className={`${styles.navLink} ${pathname === "/favorites" ? styles.active : ""}`}
          >
            Favorites
            {favoriteCount > 0 && (
              <span className={styles.badge}>{favoriteCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
