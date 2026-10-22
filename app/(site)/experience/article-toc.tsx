"use client";

import { useEffect, useState } from "react";
import styles from "./essay.module.css";

export function ArticleToc({ headings }: { headings: string[] }) {
  const [activeSection, setActiveSection] = useState("section-1");

  useEffect(() => {
    const sections = headings
      .map((_, index) => document.getElementById(`section-${index + 1}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.1, 0.35, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className={styles.contents} aria-label="Article contents">
      <div className={styles.contentsHeading}><span className={styles.contentsMark} /> <span>On this article</span></div>
      <ol>
        {headings.map((heading, index) => {
          const id = `section-${index + 1}`;
          return <li key={heading} className={activeSection === id ? styles.activeTocItem : undefined}>
            <a href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{heading}</a>
          </li>;
        })}
      </ol>
    </nav>
  );
}
