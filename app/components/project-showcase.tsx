"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "./project-showcase.module.css";

// Replace these sample titles and images with real project details when ready.
const projects = [
  {
    title: "eMSC",
    image: "/project/emsc.png",
    alt: "Blue puzzle pieces spelling Project",
    technologies: [
      { name: "Sufia", logo: "/logos/sufia.png" },
      { name: "Mysql", logo: "/logos/mysql.svg" },
      { name: "React", logo: "/logos/react.svg" },
      { name: "TypeScript", logo: "/logos/typescript.svg" },
      { name: "Microsoft Azure", logo: "/logos/microsoft-azure.svg" },
      { name: "Git", logo: "/logos/git.svg" },
    ],
  },
  {
    title: "Admin",
    image: "/project/ysmadmin.png",
    alt: "Sunlit leaves casting shadows on a cream wall",
    technologies: [
      { name: "Laravel", logo: "/logos/laravel.svg" },
      { name: "Mysql", logo: "/logos/mysql.svg" },
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "TypeScript", logo: "/logos/typescript.svg" },
      { name: "RESTful API Design", logo: "/logos/rest-api.svg" },
      { name: "Php", logo: "/logos/php.svg" },
    ],
  },
  {
    title: "Oceztra",
    image: "/project/oceztra.png",
    alt: "Olive linen folds in warm sunlight",
    technologies: [
      { name: "Sufia", logo: "/logos/sufia.png" },
      { name: "Python", logo: "/logos/python.svg" },
      { name: "MySQL", logo: "/logos/mysql.svg" },
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "Microsoft Azure", logo: "/logos/microsoft-azure.svg" },
      { name: "Git", logo: "/logos/git.svg" },
    ],
  },
  {
    title: "Client",
    image: "/project/ysmuser.png",
    alt: "Wood and stone composition with a wooden sphere",
    technologies: [
      { name: "Laravel", logo: "/logos/laravel.svg" },
      { name: "Mysql", logo: "/logos/mysql.svg" },
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "TypeScript", logo: "/logos/typescript.svg" },
    ],
  },
  {
    title: "anycomp",
    image: "/project/anycomp.png",
    alt: "Design workspace with a sketchbook and laptop",
    technologies: [
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "Express.js", logo: "/logos/expressjs.svg" },
      { name: "MongoDB", logo: "/logos/mongodb.svg" },
    ],
  },
];

export function ProjectShowcase() {
  const [selected, setSelected] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const project = projects[selected];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const section = document.getElementById("projects");
    if (!section) return;

    let isPaused = false;
    const advance = () => {
      if (!isPaused && document.visibilityState === "visible") {
        setSelected((current) => (current + 1) % projects.length);
      }
    };

    const pause = () => {
      isPaused = true;
    };
    const resume = () => {
      isPaused = false;
    };

    section.addEventListener("mouseenter", pause);
    section.addEventListener("mouseleave", resume);
    section.addEventListener("focusin", pause);
    section.addEventListener("focusout", resume);
    const interval = window.setInterval(advance, 5000);

    return () => {
      window.clearInterval(interval);
      section.removeEventListener("mouseenter", pause);
      section.removeEventListener("mouseleave", resume);
      section.removeEventListener("focusin", pause);
      section.removeEventListener("focusout", resume);
    };
  }, [shouldReduceMotion]);

  return (
    <TooltipProvider delayDuration={300}>
      <section id="projects" className={styles.section} aria-label="Projects">
      <div className={styles.showcase}>
        <div
          id="project-preview"
          className={styles.preview}
          role="group"
          aria-label={`Preview: ${project.title}`}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={project.image}
              className={styles.slide}
              initial={
                shouldReduceMotion ? false : { opacity: 0, scale: 1.025 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.99 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                loading="eager"
                src={project.image}
                alt={project.alt}
                fill
                sizes="100vw"
                className={styles.image}
              />
            </motion.div>
          </AnimatePresence>
          <div className={styles.shade} />
          <div className={styles.details} aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={project.title}
                initial={shouldReduceMotion ? false : { y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={
                  shouldReduceMotion ? { opacity: 0 } : { y: -16, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
                exit={
                  shouldReduceMotion ? { opacity: 0 } : { y: -10, opacity: 0 }
                }
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
              <motion.div
                key={project.title}
                className={styles.circles}
                aria-label={`Technologies used in ${project.title}`}
              >
                {project.technologies.map((technology) => (
                  <Tooltip key={technology.name}>
                    <TooltipTrigger asChild>
                      <motion.span
                        className={styles.circle}
                        aria-label={technology.name}
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                      >
                        <Image src={technology.logo} alt={technology.name} width={28} height={28} />
                      </motion.span>
                    </TooltipTrigger>
                    <TooltipContent>{technology.name}</TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.selection}>
            <div className={styles.selectionHeader}>
              <p id="project-selection-label" className={styles.label}>
                Highlights
              </p>
              <span>
                Select a project <span aria-hidden="true">↗</span>
              </span>
            </div>
            <div
              className={styles.cards}
              role="group"
              aria-labelledby="project-selection-label"
            >
              {projects.map((item, index) => (
                <Tooltip key={item.image}>
                  <TooltipTrigger asChild>
                    <motion.button
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
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="120px"
                    className={styles.thumbnail}
                  />
                  {index === selected && (
                    <motion.span
                      className={styles.selectedOutline}
                      layoutId="selected-project"
                      aria-hidden="true"
                    />
                  )}
                  <span className={styles.cardNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <AnimatePresence>
                    {index === selected && (
                      <motion.span
                        className={styles.selectedMark}
                        aria-hidden="true"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, scale: 0.5, rotate: -35 }
                        }
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        ↗
                      </motion.span>
                    )}
                  </AnimatePresence>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top">View {item.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </TooltipProvider>
  );
}
