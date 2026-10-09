import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceDecorations } from "../experience/experience-decorations";
import decorationStyles from "../experience/experience.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | Hafizi",
  description: "Get to know Hafizi, a Malaysian full-stack developer exploring data and analytics.",
};

export default function AboutPage() {
  return (
    <div className={`${decorationStyles.page} page-shell flex flex-col flex-1 items-center bg-background font-sans`}>
      <ExperienceDecorations />
      <main className={styles.main}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>About me</p>
          <h1>Hi, I&apos;m Hafizi.<br /><em>Curious by nature.</em></h1>
          <p className={styles.lead}>A Malaysian full-stack developer, building practical web applications and exploring the possibilities of data and analytics.</p>
        </header>

        <section className={styles.section} aria-labelledby="building-heading">
          <span className={styles.number} aria-hidden="true">01</span>
          <div>
            <h2 id="building-heading">From ideas to useful things.</h2>
            <p>I enjoy turning ideas into web applications that people can use. For me, building is a way to ask questions, solve problems, and keep learning.</p>
            <Link className={styles.link} href="/experience">Explore my work <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="learning-heading">
          <span className={styles.number} aria-hidden="true">02</span>
          <div>
            <h2 id="learning-heading">A new perspective through data.</h2>
            <p>I&apos;m deepening my skills in data and analytics. I want to bring that perspective to my development work: understanding patterns, asking better questions, and finding useful insights.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="heritage-heading">
          <span className={styles.number} aria-hidden="true">03</span>
          <div>
            <h2 id="heritage-heading">A little of home, in the details.</h2>
            <p>The wau, textile-inspired patterns, and Malaysian landscape in this portfolio bring my cultural identity into the design. They make this space feel personal, alongside the work and ideas I share.</p>
            <Link className={styles.link} href="/concept">Behind the design <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Have an idea to share?</p>
          <Link className="hero-primary-link" href="/contact">Let&apos;s connect <span aria-hidden="true">&rarr;</span></Link>
        </footer>
      </main>
    </div>
  );
}
