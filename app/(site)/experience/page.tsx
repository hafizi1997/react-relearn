import type { Metadata } from "next";
import Image from "next/image";
import { ExperienceDecorations } from "./experience-decorations";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description: "Selected projects and experiments by Hafizi across software, data, and interaction design.",
};

type ExperienceCard = {
  title: string;
  date: string;
  aspectRatio: string;
  metaPosition: "top" | "bottom";
  action?: string;
  href?: string;
  tone?: "plain" | "soft" | "warm" | "deep";
  media: {
    type: "image" | "video";
    src: string;
    alt: string;
    position?: string;
  };
};

const experienceCards: ExperienceCard[] = [
  {
    title: "DD System",
    date: "June 2026",
    aspectRatio: "40 / 27",
    metaPosition: "top",
    action: "View Production",
    href: "/experience/novelty",
    tone: "plain",
    media: { type: "video", src: "/video/shopping-cart-process-clean.mp4", alt: "Shopping cart interface process presentation" },
  },
  {
    title: "Posters",
    date: "August 2026",
    aspectRatio: "40 / 17",
    metaPosition: "bottom",
    tone: "soft",
    media: { type: "image", src: "/concept/Sunlit Foliage Shadows on Plaster.png", alt: "Sunlit foliage shadows on a plaster wall" },
  },
  {
    title: "Novelty",
    date: "February 2026",
    aspectRatio: "40 / 27",
    metaPosition: "bottom",
    action: "Read Essay",
    href: "/experience/word-lookup",
    tone: "plain",
    media: { type: "image", src: "/concept/From Chaos to Clarity.png", alt: "Abstract composition representing clarity from chaos" },
  },
  {
    title: "Combobox",
    date: "December 2025",
    aspectRatio: "4 / 3",
    metaPosition: "top",
    tone: "deep",
    media: { type: "image", src: "/concept/Sunlit Glass Spheres and Stone.png", alt: "Glass spheres and stone in sunlight" },
  },
  {
    title: "Testimonials",
    date: "September 2025",
    aspectRatio: "40 / 27",
    metaPosition: "top",
    action: "View Production",
    href: "/concept",
    tone: "plain",
    media: { type: "image", src: "/concept/Sunlit Minimalist Design Workspace.png", alt: "Minimalist design workspace in sunlight" },
  },
  {
    title: "Next.js Dev Tools",
    date: "February 2025",
    aspectRatio: "10 / 11",
    metaPosition: "bottom",
    action: "View Prototype",
    href: "/concept",
    tone: "warm",
    media: { type: "image", src: "/concept/Sunlit Olive Linen Folds.png", alt: "Olive linen folds in warm sunlight" },
  },
  {
    title: "Inline Conversion",
    date: "November 2024",
    aspectRatio: "20 / 9",
    metaPosition: "top",
    tone: "soft",
    media: { type: "image", src: "/concept/Sunlit Tropical Leaves on Cream Wall.png", alt: "Tropical leaves against a cream wall", position: "center 35%" },
  },
  {
    title: "Toolbar Morph",
    date: "September 2024",
    aspectRatio: "40 / 23",
    metaPosition: "bottom",
    action: "View Prototype",
    href: "/concept",
    tone: "plain",
    media: { type: "image", src: "/concept/Sunlit UX Design Workspace.png", alt: "UX design workspace in sunlight" },
  },
  {
    title: "X-Ray Interaction",
    date: "May 2024",
    aspectRatio: "1 / 1",
    metaPosition: "top",
    tone: "warm",
    media: { type: "image", src: "/concept/Sunlit Stone and Wood Still Life.png", alt: "Stone and wood still life", position: "center 35%" },
  },
  {
    title: "Blur Reveal",
    date: "April 2024",
    aspectRatio: "80 / 33",
    metaPosition: "bottom",
    tone: "soft",
    media: { type: "image", src: "/concept/Sunlit Glass Spheres and Stone.png", alt: "Glass spheres and stone in sunlight", position: "65% center" },
  },
  {
    title: "Word Lookup",
    date: "January 2024",
    aspectRatio: "10 / 11",
    metaPosition: "top",
    action: "Read Essay",
    href: "/concept",
    tone: "plain",
    media: { type: "image", src: "/concept/Sunlit UX Design Workspace.png", alt: "UX design workspace in sunlight", position: "35% center" },
  },
  {
    title: "Preview Comments",
    date: "December 2022",
    aspectRatio: "4 / 3",
    metaPosition: "bottom",
    tone: "deep",
    media: { type: "image", src: "/concept/Sunlit Olive Linen Folds.png", alt: "Olive linen folds in warm sunlight", position: "65% center" },
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

                <div className={styles.placeholder}>
                  {card.media.type === "video" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={card.media.alt}
                    >
                      <source src={card.media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={card.media.src}
                      alt={card.media.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1199px) 50vw, 33vw"
                      className={styles.media}
                      style={{ objectPosition: card.media.position }}
                    />
                  )}
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
