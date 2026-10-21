import type { Metadata } from "next";
import Image from "next/image";
import styles from "./concept.module.css";
import { OpeningStatement } from "./opening-statement";

export const metadata: Metadata = {
  title: "Concept | Hafizi",
  description: "The ideas, design principles, and visual direction behind my portfolio.",
};

const principles = [
  ["Clarity First", "Make key information easy to understand."],
  ["Purposeful Visuals", "Every visual supports the story."],
  ["Minimal & Focused", "Less, but more meaningful."],
  ["Smooth Experience", "Interactions feel natural and intentional."],
  ["Consistent Design", "A unified visual language across the site."],
  ["Accessible", "Designed with usability and inclusion in mind."],
  ["Performance", "Built for a smooth and fast experience."],
  ["Mobile Friendly", "A seamless experience across screen sizes."],
];

const journey = [
  ["Hero", "A first impression with a clear message."],
  ["Work", "Selected projects that show impact."],
  ["Process", "How I think and work."],
  ["Journey", "My career evolution."],
  ["About", "A little more about me."],
  ["Contact", "An easy way to start a conversation."],
];

function EmptyIcon() {
  return <span className={styles.emptyIcon} aria-hidden="true" />;
}

function MoodImage({ name, alt }: { name: string; alt: string }) {
  return (
    <div className={styles.moodImage}>
      <Image src={`/concept/${name}.png`} alt={alt} fill sizes="(max-width: 600px) 45vw, (max-width: 1100px) 25vw, 15vw" />
    </div>
  );
}

export default function ConceptPage() {
  return (
    <article className={styles.page}>
      <OpeningStatement />

      <section className={styles.hero} id="design-thinking" aria-labelledby="concept-heading">
        <div className={styles.heroCopy}>
          <p className={styles.label}>Design thinking</p>
          <h2 id="concept-heading" className={styles.heading}>The concept<br />behind the design.</h2>
          <p className={styles.description}>A closer look at the ideas, choices and principles that shape my website — and how they create a better experience.</p>
        </div>
        <div className={styles.heroImage}>
          <Image src="/concept/Sunlit UX Design Workspace.png" alt="A sunlit workspace with interface sketches, a notebook and a laptop" fill sizes="(max-width: 767px) 100vw, 55vw" preload />
        </div>
      </section>

      <section className={`${styles.section} ${styles.idea}`} id="the-big-idea" aria-labelledby="idea-heading">
        <div>
          <p className={styles.label}>The big idea</p>
          <h2 id="idea-heading" className={styles.sectionHeading}>From complexity<br />to clarity.</h2>
          <p className={styles.description}>This website reflects my journey from software development towards analytics — turning complex information into a clear, meaningful and easy-to-navigate experience.</p>
        </div>
        <figure className={styles.ideaFigure}>
          <div className={styles.ideaImage}>
            <Image src="/concept/From Chaos to Clarity.png" alt="A tangled arrangement of fine wires becomes a single clear glass sphere" fill sizes="(max-width: 767px) 90vw, 45vw" />
          </div>
          <figcaption><span>Complexity</span><span aria-hidden="true">→</span><span>Clarity</span></figcaption>
        </figure>
      </section>

      <section className={styles.section} id="design-principles" aria-labelledby="principles-heading">
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.label}>Design principles</p>
            <h2 id="principles-heading" className={styles.sectionHeading}>What guides<br />the design.</h2>
          </div>
          <p className={styles.description}>These principles shape the visual direction, interaction and overall experience of the website.</p>
        </div>
        <ul className={styles.principles}>
          {principles.map(([title, description]) => (
            <li key={title}>
              <EmptyIcon />
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.section} ${styles.visual}`} id="visual-direction" aria-labelledby="visual-heading">
        <div>
          <p className={styles.label}>Visual direction</p>
          <h2 id="visual-heading" className={styles.sectionHeading}>A calm and<br />focused aesthetic.</h2>
          <p className={styles.description}>Warm rose tones, cream typography and touches of gold give the site its identity. Natural light, tactile materials and simple forms bring a calm, human feeling to the visual story.</p>
        </div>
        <div className={styles.moodboard} aria-label="Visual inspiration and the website color palette">
          <MoodImage name="Sunlit Olive Linen Folds" alt="Soft folds of olive linen in sunlight" />
          <div className={styles.palette} aria-label="Deep burgundy, rose, gold and cream">
            <span className={styles.swatchDeep} title="Deep burgundy" />
            <span className={styles.swatchRose} title="Rose" />
            <span className={styles.swatchGold} title="Gold" />
            <span className={styles.swatchCream} title="Cream" />
          </div>
          <MoodImage name="Sunlit Tropical Leaves on Cream Wall" alt="Tropical leaves against a warm cream wall" />
          <MoodImage name="Sunlit Glass Spheres and Stone" alt="Glass spheres with natural stone" />
          <MoodImage name="Sunlit Stone and Wood Still Life" alt="A still life of stone and wood textures" />
          <MoodImage name="Sunlit Foliage Shadows on Plaster" alt="Soft foliage shadows falling across plaster" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.journey}`} id="user-journey" aria-labelledby="journey-heading">
        <div>
          <p className={styles.label}>User journey</p>
          <h2 id="journey-heading" className={styles.sectionHeading}>A clear and<br />intentional flow.</h2>
          <p className={styles.description}>The intended journey moves from understanding who I am to exploring my work, process and background, and finally getting in touch.</p>
        </div>
        <ol className={styles.journeySteps}>
          {journey.map(([title, description], index) => (
            <li key={title}>
              <EmptyIcon />
              <div>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
