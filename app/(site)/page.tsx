import Image from "next/image";
import { ClickWord } from "../components/click-word";
import { ContactSection } from "../components/contact-section";
import Link from "next/link";
import { SectionFlowers } from "../components/section-flowers";
import { HeroWau } from "../components/hero-wau";
import styles from "./home.module.css";
import { HeroTransition } from "../components/hero-transition";
import { TableScene } from "../components/table-scene";

export default function Home() {
  return (
    <div id="page-top" tabIndex={-1} className={`${styles.homeShell} page-shell hero-visual-page flex flex-col flex-1 items-center bg-background font-sans`}>
      <main className={`${styles.homeContent} content-grid flex-1 bg-surface`}>
        <HeroTransition hero={
        <section className="hero-section" aria-labelledby="hero-heading">
          <Image
            className="hero-background"
            src="/hero/jerai-afternoon.webp"
            alt=""
            fill
            preload
            sizes="(max-width: 1023px) 1400px, 100vw"
          />
          <HeroWau />
          <SectionFlowers section="hero" />
          <div className="hero-content">
            <h1 id="hero-heading">
              <span className="hero-heading-line">Built with purpose.</span>
              <span className="hero-heading-line hero-heading-offset">Thoughtful by <em>design.</em></span>
            </h1>
            <div className="hero-actions">
              <Link className="hero-primary-link" href="/experience">
                View my work <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link className="hero-secondary-link" href="/about">About me</Link>
            </div>
          </div>
        </section>
        } table={
        <section className={styles.tableSection} aria-labelledby="table-heading">
          <SectionFlowers section="table" />
          <div className={styles.gameInvitation}>
            <h2 id="table-heading">
              <span>Take a seat</span>{" "}
              <span className={styles.headingAmpersand}>&amp;</span>{" "}
              <span>Make your <em>move</em></span>
            </h2>
          </div>
          <div className={styles.tableStage}>
            <TableScene />
          </div>
        </section>
        } />
        <section className={styles.nextSection} aria-labelledby="experience-heading">
          <h2 id="experience-heading" className={styles.experienceStatement}>
            <span>4 years of making</span>{" "}
            <span>users <ClickWord /> and love</span>{" "}
            <span>my apps</span>
          </h2>
        </section>
        <section className={styles.projectsSection} aria-labelledby="projects-heading">
          <div className={styles.projectsPlaceholder}>
            <h2 id="projects-heading">Selected projects</h2>
            <p>Project showcase coming soon.</p>
          </div>
        </section>
        <ContactSection />
      </main>
    </div>
  );
}
