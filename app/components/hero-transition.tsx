"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./hero-transition.module.css";
import { useSectionScroll } from "./use-section-scroll";

export function HeroTransition({ hero, table }: { hero: ReactNode; table: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const heroLayer = heroRef.current;
    const tableLayer = tableRef.current;
    if (!root || !heroLayer || !tableLayer) return;

    const navigation = document.querySelector<HTMLElement>(".site-nav");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const stickyTop = navigation?.getBoundingClientRect().height ?? 0;
      const availableHeight = window.innerHeight - stickyTop;
      // Short/mobile viewports need normal document flow so artwork and text
      // remain reachable; scrolling still follows the user's input at one-third speed.
      if (motion.matches || window.innerWidth < 768 || availableHeight < 720) {
        delete root.dataset.animated;
        root.style.removeProperty("--scene-height");
        heroLayer.inert = false;
        tableLayer.inert = false;
        return;
      }
      root.dataset.animated = "true";
      // Match the navigation's actual height, including wrapped mobile links.
      root.style.setProperty("--scene-top", `${stickyTop}px`);
      root.style.setProperty("--scene-height", `${availableHeight}px`);
      const distance = root.offsetHeight - (root.firstElementChild as HTMLElement).offsetHeight;
      const progress = Math.min(1, Math.max(0, (stickyTop - root.getBoundingClientRect().top) / Math.max(1, distance)));
      // Fade with the smoothed scroll position, rather than a timed transition.
      const eased = progress;
      root.style.setProperty("--hero-opacity", String(1 - eased));
      root.style.setProperty("--hero-blur", `${(eased * 12).toFixed(2)}px`);
      root.style.setProperty("--table-opacity", String(eased));
      root.dataset.blending = String(progress > 0 && progress < 1);
      // Hidden layers must not intercept pointer or keyboard interaction.
      heroLayer.inert = eased >= 0.5;
      tableLayer.inert = eased < 0.5;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    if (navigation) observer.observe(navigation);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      delete root.dataset.animated;
      root.style.removeProperty("--scene-top");
      root.style.removeProperty("--scene-height");
      heroLayer.inert = false;
      tableLayer.inert = false;
    };
  }, []);

  useSectionScroll(rootRef);

  return (
    <div ref={rootRef} className={styles.transition}>
      <div className={styles.stage}>
        <div ref={heroRef} className={styles.hero}>{hero}</div>
        <div ref={tableRef} className={styles.table}>{table}</div>
      </div>
    </div>
  );
}
