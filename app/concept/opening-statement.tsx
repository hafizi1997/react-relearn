"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./concept.module.css";

const lines = [
  ["A", "good", "UI", "is", "not", "just", "about"],
  ["typography", "or", "images;"],
  ["it", "is", "about"],
  ["the", "problem", "you"],
  ["are", "trying", "to", "solve"],
];
const lineClasses = [styles.statementIntro, styles.statementIngredients, styles.statementTurn, styles.statementProblem, styles.statementProblem];

export function OpeningStatement() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let index = 0;
  return (
    <section ref={ref} className={styles.openingStatement} aria-labelledby="opening-statement-heading">
      <div className={styles.statementContent}>
        <h1 id="opening-statement-heading" className={`${styles.statement} ${active ? styles.statementActive : ""}`}>
          {lines.map((words, lineIndex) => (
            <span key={lineIndex} className={lineClasses[lineIndex]}>
              {words.map((word) => {
                const delay = `${index++ * 85}ms`;
                const accent = lineIndex === 1 && (word === "typography" || word === "images;");
                const teal = lineIndex === 2 && (word === "it" || word === "is");
                const badge = word === "solve";
                return <span key={`${word}-${delay}`} className={`${styles.statementWord} ${accent ? styles.statementAccent : ""} ${teal ? styles.statementTeal : ""} ${badge ? styles.statementBadge : ""}`} style={{ "--word-delay": delay } as CSSProperties}>{word}</span>;
              })}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
