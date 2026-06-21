import React from "react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} id="app-footer">
      <div className={styles.container}>
        <p className={styles.text}>Built for Jeevan — Amit Yadav</p>
      </div>
    </footer>
  );
}

export default Footer;
