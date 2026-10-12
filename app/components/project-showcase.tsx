"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();
  const project = projects[selected];

  return (
    <section id="projects" className={styles.section} aria-label="Projects">
      <div className={styles.showcase}>
        <div id="project-preview" className={styles.preview} role="group" aria-label={`Preview: ${project.title}`}>
          <AnimatePresence initial={false}>
            <motion.div
              key={project.image}
              className={styles.slide}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={project.image} alt={project.alt} fill sizes="100vw" className={styles.image} />
            </motion.div>
          </AnimatePresence>
          <div className={styles.shade} />
          <div className={styles.details} aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={project.title}
                initial={shouldReduceMotion ? false : { y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: -16, opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h2>
            </AnimatePresence>
          </div>
          <span className={styles.counter} aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={selected}
                className={styles.currentCount}
                initial={shouldReduceMotion ? false : { y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: -10, opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
              >
                {String(selected + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>{" "}
            <span>/ 05</span>
          </span>
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
                <motion.button
                  key={item.image}
                  type="button"
                  className={`${styles.card} ${index === selected ? styles.selectedCard : ""}`}
                  onClick={() => setSelected(index)}
                  aria-pressed={index === selected}
                  aria-controls="project-preview"
                  aria-label={`Show ${item.title}`}
                  whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
                  whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.975 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                >
                  <Image src={item.image} alt="" fill sizes="120px" className={styles.thumbnail} />
                  {index === selected && (
                    <motion.span className={styles.selectedOutline} layoutId="selected-project" aria-hidden="true" />
                  )}
                  <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <AnimatePresence>
                    {index === selected && (
                      <motion.span
                        className={styles.selectedMark}
                        aria-hidden="true"
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5, rotate: -35 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        ↗
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
