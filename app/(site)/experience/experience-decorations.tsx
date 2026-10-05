"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./experience.module.css";

// Leave room for the final flower at 1940px, including its rotated height.
const TILE_HEIGHT = 1900;
const leftFlowers = [styles.leftSprig, styles.leftOrnament, styles.leftFloral];
const rightFlowers = [styles.rightUpperFloral, styles.rightSprig, styles.rightOrnament, styles.rightLowerFloral];

export function ExperienceDecorations() {
  const rightRef = useRef<HTMLDivElement>(null);
  const [tileCount, setTileCount] = useState(1);

  useEffect(() => {
    const container = rightRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      setTileCount(Math.max(1, Math.ceil(container.clientHeight / TILE_HEIGHT)));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.leftDecorations} aria-hidden="true">
        <div className={styles.leftFlowers}>
          {leftFlowers.map((flower) => (
            <span key={flower} className={`${styles.flower} ${flower}`} />
          ))}
        </div>
      </div>
      <div ref={rightRef} className={styles.rightDecorations} aria-hidden="true">
        {Array.from({ length: tileCount }, (_, index) => (
          <div key={index} className={styles.rightTile} style={{ top: index * TILE_HEIGHT, height: TILE_HEIGHT }}>
            {rightFlowers.map((flower) => (
              <span key={flower} className={`${styles.flower} ${flower}`} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
