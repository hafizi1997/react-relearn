import styles from "./page-decorations.module.css";

export function SectionFlowers({ section }: { section: "hero" | "table" | "work" }) {
  return (
    <div className={`${styles.container} ${styles.sectionFlowers}`} data-section={section} aria-hidden="true">
      <span className={`${styles.decor} ${styles.floralLeft}`} />
      <span className={`${styles.decor} ${styles.sprig}`} />
    </div>
  );
}
