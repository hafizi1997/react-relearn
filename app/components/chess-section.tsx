"use client";

import { motion, useReducedMotion } from "motion/react";
import { TableScene } from "./table-scene";
import { TableDecorations } from "./table-decorations";
import { useTableVisibility } from "./hero-transition";
import styles from "../(site)/home.module.css";

const lineVariants = {
  hidden: { y: "115%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function ChessSection() {
  const shouldReduceMotion = useReducedMotion();
  const isTableVisible = useTableVisibility();

  return (
    <section className={styles.tableSection} aria-labelledby="table-heading">
      <TableDecorations />
      <motion.div
        className={styles.gameInvitation}
        initial="hidden"
        animate={isTableVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
        }}
      >
        <h2 id="table-heading">
          <span className={styles.tableHeadingClip}>
            <motion.span variants={lineVariants} transition={{ duration: shouldReduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}>
              Take a seat
            </motion.span>
          </span>
          <span className={`${styles.tableHeadingClip} ${styles.headingAmpersand}`}>
            <motion.span variants={lineVariants} transition={{ duration: shouldReduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}>
              &amp;
            </motion.span>
          </span>
          <span className={styles.tableHeadingClip}>
            <motion.span variants={lineVariants} transition={{ duration: shouldReduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}>
              Make your <em>move</em>
            </motion.span>
          </span>
        </h2>
        <motion.span
          className={styles.invitationRule}
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1 } }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <div className={styles.tableStage}>
        <TableScene />
      </div>
    </section>
  );
}
