import { ExperienceDecorations } from "./experience-decorations";
import styles from "./experience.module.css";

type ExperienceCard = {
  title: string;
  date: string;
  aspectRatio: string;
  metaPosition: "top" | "bottom";
  action?: string;
  href?: string;
  tone?: "plain" | "soft" | "warm" | "deep";
  placeholder?: "empty" | "loader";
};

const experienceCards: ExperienceCard[] = [
  {
    title: "DD System",
    date: "June 2026",
    aspectRatio: "40 / 27",
    metaPosition: "top",
    action: "View Production",
    href: "/concept",
    tone: "plain",
    placeholder: "loader",
  },
  {
    title: "Posters",
    date: "August 2026",
    aspectRatio: "40 / 17",
    metaPosition: "bottom",
    tone: "soft",
  },
  {
    title: "Novelty",
    date: "February 2026",
    aspectRatio: "40 / 27",
    metaPosition: "bottom",
    action: "Read Essay",
    href: "/concept",
    tone: "plain",
  },
  {
    title: "Combobox",
    date: "December 2025",
    aspectRatio: "4 / 3",
    metaPosition: "top",
    tone: "deep",
  },
  {
    title: "Testimonials",
    date: "September 2025",
    aspectRatio: "40 / 27",
    metaPosition: "top",
    action: "View Production",
    href: "/concept",
    tone: "plain",
  },
  {
    title: "Next.js Dev Tools",
    date: "February 2025",
    aspectRatio: "10 / 11",
    metaPosition: "bottom",
    action: "View Prototype",
    href: "/concept",
    tone: "warm",
  },
  {
    title: "Inline Conversion",
    date: "November 2024",
    aspectRatio: "20 / 9",
    metaPosition: "top",
    tone: "soft",
  },
  {
    title: "Toolbar Morph",
    date: "September 2024",
    aspectRatio: "40 / 23",
    metaPosition: "bottom",
    action: "View Prototype",
    href: "/concept",
    tone: "plain",
  },
  {
    title: "X-Ray Interaction",
    date: "May 2024",
    aspectRatio: "1 / 1",
    metaPosition: "top",
    tone: "warm",
  },
  {
    title: "Blur Reveal",
    date: "April 2024",
    aspectRatio: "80 / 33",
    metaPosition: "bottom",
    tone: "soft",
  },
  {
    title: "Word Lookup",
    date: "January 2024",
    aspectRatio: "10 / 11",
    metaPosition: "top",
    action: "Read Essay",
    href: "/concept",
    tone: "plain",
  },
  {
    title: "Preview Comments",
    date: "December 2022",
    aspectRatio: "4 / 3",
    metaPosition: "bottom",
    tone: "deep",
  },
];

function getCardClassName(card: ExperienceCard) {
  return [
    styles.card,
    card.metaPosition === "top" ? styles.metaTop : styles.metaBottom,
    card.action ? styles.hasAction : "",
    card.tone ? styles[`${card.tone}Tone`] : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function CardMeta({ card }: { card: ExperienceCard }) {
  return (
    <div className={styles.meta}>
      <h2>{card.title}</h2>
      <time>{card.date}</time>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <div className={`${styles.page} page-shell flex flex-col flex-1 items-center bg-background font-sans`}>
      <ExperienceDecorations />
      <main className={styles.main}>
        <ul className={styles.gallery} aria-label="Experience archive" role="list">
          {experienceCards.map((card) => (
            <li
              key={`${card.title}-${card.date}`}
              className={getCardClassName(card)}
              style={{ aspectRatio: card.aspectRatio }}
            >
              <article className={styles.cardInner}>
                {card.metaPosition === "top" && <CardMeta card={card} />}

                <div className={styles.placeholder} aria-hidden="true">
                  {card.placeholder === "loader" && <span className={styles.loader} />}
                </div>

                {card.metaPosition === "bottom" && <CardMeta card={card} />}

                {card.action && card.href && (
                  <a className={styles.action} href={card.href}>
                    {card.action}
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
