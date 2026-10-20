"use client";

import { motion, useReducedMotion } from "motion/react";
import { ClickWord } from "./click-word";
import styles from "../(site)/home.module.css";

const lineVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function ExperienceStatement() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.nextSection} aria-labelledby="experience-heading">
      <motion.h2
        id="experience-heading"
        className={styles.experienceStatement}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.14 } },
        }}
      >
        <span className={styles.experienceLineClip}>
          <motion.span variants={lineVariants} transition={{ duration: shouldReduceMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}>
            4 years of making
          </motion.span>
        </span>
        <span className={styles.experienceLineClip}>
          <motion.span variants={lineVariants} transition={{ duration: shouldReduceMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}>
            users <ClickWord /> and they
          </motion.span>
        </span>
        <span className={styles.experienceLineClip}>
          <motion.span variants={lineVariants} transition={{ duration: shouldReduceMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}>
            <motion.em
              className={styles.experienceHighlight}
              variants={{
                hidden: { color: "#171717" },
                visible: { color: "#bd302c" },
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.35 }}
            >
              love
            </motion.em>{" "}
            it
          </motion.span>
        </span>
      </motion.h2>
    </section>
  );
}
