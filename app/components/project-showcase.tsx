"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./project-showcase.module.css";

// Replace these sample titles and images with real project details when ready.
const projects = [
  { title: "Project 01", image: "/project/project-example.jpg", alt: "Blue puzzle pieces spelling Project" },
  { title: "Project 02", image: "/project/project-example2.png", alt: "Sunlit leaves casting shadows on a cream wall" },
  { title: "Project 03", image: "/project/project-example3.png", alt: "Olive linen folds in warm sunlight" },
  { title: "Project 04", image: "/project/project-example4.png", alt: "Wood and stone composition with a wooden sphere" },
  { title: "Project 05", image: "/project/project-example5.png", alt: "Design workspace with a sketchbook and laptop" },
];

const colors = ["#d6af65", "#d7d9cf", "#53a7b5", "#53b9a8", "#d47654", "#749ec4", "#b38c9d", "#bb6470", "#81b8ab", "#8c9a79", "#d1956f", "#a29aca"];

export function ProjectShowcase() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <section id="projects" className={styles.section} aria-label="Projects">
      <div className={styles.showcase}>
        <div id="project-preview" className={styles.preview} role="group" aria-label={`Preview: ${project.title}`}>
          {projects.map((item, index) => (
            <div key={item.image} className={`${styles.slide} ${index === selected ? styles.activeSlide : ""}`} aria-hidden={index !== selected}>
              <Image src={item.image} alt={item.alt} fill sizes="100vw" className={styles.image} />
            </div>
          ))}
          <div className={styles.shade} />
          <div className={styles.details} aria-live="polite" aria-atomic="true">
            <h2>{project.title}<span aria-hidden="true"> /</span></h2>
          </div>
          <span className={styles.counter} aria-hidden="true">{String(selected + 1).padStart(2, "0")} <span>/ 05</span></span>
        </div>

        <div className={styles.controls}>
          <div className={styles.palette} aria-hidden="true">
            <p className={styles.label}>Colours</p>
            <div className={styles.circles}>
              {colors.map((color) => <span key={color} className={styles.circle} style={{ backgroundColor: color }} />)}
            </div>
          </div>
          <div className={styles.selection}>
            <div className={styles.selectionHeader}>
              <p id="project-selection-label" className={styles.label}>Highlights</p>
              <span>Select a project <span aria-hidden="true">↗</span></span>
            </div>
            <div className={styles.cards} role="group" aria-labelledby="project-selection-label">
              {projects.map((item, index) => (
                <button key={item.image} type="button" className={`${styles.card} ${index === selected ? styles.selectedCard : ""}`} onClick={() => setSelected(index)} aria-pressed={index === selected} aria-controls="project-preview" aria-label={`Show ${item.title}`}>
                  <Image src={item.image} alt="" fill sizes="120px" className={styles.thumbnail} />
                  <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
                  {index === selected && <span className={styles.selectedMark} aria-hidden="true">↗</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
