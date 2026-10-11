import Image from "next/image";
import Link from "next/link";
import { SectionFlowers } from "../components/section-flowers";
import { HeroWau } from "../components/hero-wau";
import styles from "./home.module.css";
import { HeroTransition } from "../components/hero-transition";
import { TableScene } from "../components/table-scene";

export default function Home() {
  return (
    <div className={`${styles.homeShell} page-shell hero-visual-page flex flex-col flex-1 items-center bg-background font-sans`}>
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
        <section className={styles.nextSection} aria-labelledby="work-heading">
          <SectionFlowers section="work" />
          <div className={styles.workIntro}>
            <p className={styles.workEyebrow}>Selected work</p>
            <h2 id="work-heading">From curiosity<br />to <em>creation.</em></h2>
            <p className={styles.workDescription}>
              A closer look at the projects, prototypes, and small details
              behind my work.
            </p>
            <Link className="hero-primary-link" href="/experience">
              Explore my work <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <ol className={styles.workList}>
            <li>
              <span className={styles.workNumber} aria-hidden="true">01</span>
              <div><h3>DD System</h3><time dateTime="2026-06">June 2026</time></div>
            </li>
            <li>
              <span className={styles.workNumber} aria-hidden="true">02</span>
              <div><h3>Toolbar Morph</h3><time dateTime="2024-09">September 2024</time></div>
            </li>
            <li>
              <span className={styles.workNumber} aria-hidden="true">03</span>
              <div><h3>Word Lookup</h3><time dateTime="2024-01">January 2024</time></div>
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
