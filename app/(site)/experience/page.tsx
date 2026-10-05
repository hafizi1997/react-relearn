import { ExperienceDecorations } from "./experience-decorations";
import styles from "./experience.module.css";

// Keep each preview's proportions when its video is added later.
const previewAspectRatios = [
  "10 / 11",
  "40 / 17",
  "40 / 27",
  "20 / 9",
  "40 / 41",
  "40 / 23",
  "4 / 3",
  "80 / 33",
  "1 / 1",
];

// Give the sidebar flowers enough vertical room in the three-column layout.
const placeholders = Array.from({ length: 36 }, (_, index) => ({
  id: `preview-${index + 1}`,
  aspectRatio: previewAspectRatios[index % previewAspectRatios.length],
}));

export default function ExperiencePage() {
  return (
    <div className={`${styles.page} page-shell flex flex-col flex-1 items-center bg-background font-sans`}>
      <ExperienceDecorations />
      <main className={styles.main}>
        <h1 className={styles.heading}>Experience</h1>
        <ul className={styles.gallery} aria-label="Experience video placeholders" role="list">
          {placeholders.map((placeholder, index) => (
            <li
              key={placeholder.id}
              className={styles.card}
              style={{ aspectRatio: placeholder.aspectRatio }}
            >
              <span className="sr-only">Video placeholder {index + 1}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
