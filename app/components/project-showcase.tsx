"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import styles from "./project-showcase.module.css";

// Replace these sample titles and images with real project details when ready.
const projects = [
  { title: "Project 01", image: "/project/project-example.jpg", alt: "Blue puzzle pieces spelling Project", technologies: [{ name: "React", logo: "/logos/react.svg" }, { name: "TypeScript", logo: "/logos/typescript.svg" }, { name: "Next.js", logo: "/logos/nextjs.svg" }] },
  { title: "Project 02", image: "/project/project-example2.png", alt: "Sunlit leaves casting shadows on a cream wall", technologies: [{ name: "Python", logo: "/logos/python.svg" }, { name: "Pandas", logo: "/logos/pandas.svg" }, { name: "NumPy", logo: "/logos/numpy.svg" }, { name: "Matplotlib", logo: "/logos/matplotlib.svg" }] },
  { title: "Project 03", image: "/project/project-example3.png", alt: "Olive linen folds in warm sunlight", technologies: [{ name: "SQL", logo: "/logos/sql.svg" }, { name: "MySQL", logo: "/logos/mysql.svg" }, { name: "Power BI", logo: "/logos/power-bi.svg" }, { name: "DAX", logo: "/logos/dax.svg" }] },
  { title: "Project 04", image: "/project/project-example4.png", alt: "Wood and stone composition with a wooden sphere", technologies: [{ name: "Laravel", logo: "/logos/laravel.svg" }, { name: "PHP", logo: "/logos/php.svg" }, { name: "RESTful API Design", logo: "/logos/rest-api.svg" }, { name: "Prisma ORM", logo: "/logos/prisma.svg" }] },
  { title: "Project 05", image: "/project/project-example5.png", alt: "Design workspace with a sketchbook and laptop", technologies: [{ name: "Node.js", logo: "/logos/nodejs.svg" }, { name: "Express.js", logo: "/logos/expressjs.svg" }, { name: "MongoDB", logo: "/logos/mongodb.svg" }, { name: "Microsoft Azure", logo: "/logos/microsoft-azure.svg" }, { name: "Git", logo: "/logos/git.svg" }] },
];

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
          <div className={styles.palette}>
            <p className={styles.label}>Technologies</p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={project.title} className={styles.circles} aria-label={`Technologies used in ${project.title}`}>
                {project.technologies.map((technology) => (
                  <motion.span
                    key={technology.name}
                    className={styles.circle}
                    title={technology.name}
                    aria-label={technology.name}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    <Image src={technology.logo} alt={technology.name} width={28} height={28} />
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
            {!project.technologies.length && <p className={styles.emptyTechnologies}>Technology details coming soon.</p>}
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
