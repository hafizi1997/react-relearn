"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page-decorations.module.css";

// Height of one set of decorations. Keep in sync with .tile in page-decorations.module.css.
const TILE_HEIGHT = 1800;

// Top-to-bottom order inside one tile. A short page shows the first few; a long page repeats all four.
const decorations = [
  { id: "floral-left", className: styles.floralLeft },
  { id: "sprig", className: styles.sprig },
  { id: "ornament", className: styles.ornament },
  { id: "floral-right", className: styles.floralRight },
] as const;

type PageDecorationsProps = {
  // "both" alternates left and right; "right" moves every decoration to the right edge.
  side?: "both" | "right";
};

export function PageDecorations({ side = "both" }: PageDecorationsProps) {
  const [tiles, setTiles] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Render as many sets as the page is tall; the container clips whatever overflows the bottom.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setTiles(Math.max(1, Math.ceil(el.clientHeight / TILE_HEIGHT)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.container} data-side={side} aria-hidden="true">
      {Array.from({ length: tiles }, (_, index) => (
        <div key={index} className={styles.tile} style={{ top: index * TILE_HEIGHT }}>
          {decorations.map((decor) => (
            <span key={decor.id} className={`${styles.decor} ${decor.className}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
