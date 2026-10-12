"use client";

import { useState } from "react";
import styles from "./click-word.module.css";

const colors = ["red", "yellow", "blue", "green"] as const;

export function ClickWord() {
  const [index, setIndex] = useState(0);

  return (
    <button
      type="button"
      className={styles.button}
      data-color={colors[index]}
      aria-label={`click — change button color (currently ${colors[index]})`}
      onClick={() => setIndex((current) => (current + 1) % colors.length)}
    >
      click
    </button>
  );
}
