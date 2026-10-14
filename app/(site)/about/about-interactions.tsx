"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import styles from "./about.module.css";

const toolsets = {
  Analytics: ["SQL", "Python · Pandas", "Power BI · DAX", "Tableau", "Excel & Sheets", "BigQuery"],
  Engineering: ["Next.js · React", "TypeScript", "Node.js · Express", "Laravel · PHP", "REST APIs", "MySQL · MSSQL"],
  Languages: ["English", "Bahasa Melayu"],
} as const;

type Toolset = keyof typeof toolsets;

export function AboutInteractions() {
  const [active, setActive] = useState<Toolset>("Analytics");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.toolkit} aria-labelledby="toolkit-title">
      <div className={styles.toolkitIntro}>
        <p className={styles.eyebrow}>A toolkit in two directions</p>
        <h2 id="toolkit-title">Different tools.<br /><em>One useful outcome.</em></h2>
        <p>Move between what I work with day to day and what I’ve carried with me from software engineering.</p>
        <Link className={styles.toolkitLink} href="/experience">More about my experience <span aria-hidden="true">↗</span></Link>
      </div>

      <div className={styles.toolkitPanel}>
        <div className={styles.tabList} role="tablist" aria-label="Skills">
          {(Object.keys(toolsets) as Toolset[]).map((name, index) => (
            <button className={styles.tab} id={`skills-tab-${index}`} key={name} type="button" role="tab" aria-selected={active === name} aria-controls="skills-panel" onClick={() => setActive(name)}>
              <span className={styles.tabIndex}>0{index + 1}</span>{name}
            </button>
          ))}
        </div>
        <motion.div id="skills-panel" className={styles.skillsPanel} role="tabpanel" aria-labelledby={`skills-tab-${Object.keys(toolsets).indexOf(active)}`} key={active} initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}>
          <div className={styles.skillsLabel}><span className={styles.skillsSparkle}>✳</span><span>{active.toUpperCase()}</span><span className={styles.skillsCount}>{String(toolsets[active].length).padStart(2, "0")} CAPABILITIES</span></div>
          <ul className={styles.skillList}>
            {toolsets[active].map((skill, index) => <li key={skill}><span className={styles.skillIndex}>{String(index + 1).padStart(2, "0")}</span>{skill}<span className={styles.skillMark} aria-hidden="true">↗</span></li>)}
          </ul>
          <div className={styles.panelFooter}>
            <p className={styles.panelNote}>SELECT A DISCIPLINE TO EXPLORE</p>
            {active === "Analytics" && <div className={styles.publicWork}><a href="https://public.tableau.com/app/profile/hafizi1714" target="_blank" rel="noreferrer">Tableau Public ↗</a><a href="https://github.com/hafizi1997" target="_blank" rel="noreferrer">GitHub ↗</a></div>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
