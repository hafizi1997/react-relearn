import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutInteractions } from "./about-interactions";
import { ExperienceDecorations } from "../experience/experience-decorations";
import decorationStyles from "../experience/experience.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | Hafizi",
  description: "Meet Hafizi, a Malaysian developer and data analyst connecting reliable software with useful insights.",
};

export default function AboutPage() {
  return (
    <div className={`${decorationStyles.page} page-shell flex flex-col flex-1 items-center bg-background font-sans`}>
      <ExperienceDecorations />
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.eyebrowDot} /> A little about me</p>
            <h1 id="about-title">I build things.<br />I ask <em>better questions.</em></h1>
            <p className={styles.lead}>I’m Hafizi, a Malaysian developer turned data analyst. My work lives between two questions: <strong>does it work well?</strong> And <strong>what can we learn from it?</strong></p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryLink} href="/experience">Explore my work <span aria-hidden="true">↗</span></Link>
              <Link className={styles.secondaryLink} href="/contact">Get in touch <span aria-hidden="true">→</span></Link>
            </div>
            <div className={styles.location}><span aria-hidden="true">⌖</span> Kapar, Selangor, Malaysia <span className={styles.locationDivider} /> Open to good ideas</div>
          </div>

          <div className={styles.portraitColumn}>
            <div className={styles.portraitFrame}>
              <Image className={styles.portrait} src="/about/hafizi.jpg" alt="Hafizi, software developer and data analyst" fill priority sizes="(max-width: 760px) 78vw, 390px" />
              <span className={styles.portraitIndex} aria-hidden="true">01 / THE PERSON</span>
              <span className={styles.portraitSeal} aria-hidden="true">Bina<br />&nbsp;·&nbsp;<br />faham</span>
            </div>
            <p className={styles.portraitCaption}><span>Curious by nature.</span><span>Grounded in Malaysia.</span></p>
          </div>

          <span className={styles.heroOrbit} aria-hidden="true">✳</span>
          <span className={styles.heroNote} aria-hidden="true">software<br />× insight</span>
        </section>

        <div className={styles.rule} aria-hidden="true"><span>THE THROUGH LINE</span><span>02—04</span></div>

        <section className={styles.story} aria-labelledby="story-title">
          <div className={styles.storyHeading}>
            <p className={styles.eyebrow}>The through line</p>
            <h2 id="story-title">From building<br /><em>to understanding.</em></h2>
          </div>
          <div className={styles.storyCopy}>
            <p>I started out in software engineering, making the systems people rely on every day. Over four years, I worked across products, APIs, integrations, and databases—learning how the right foundations make everything else possible.</p>
            <p>Now I’m taking that systems perspective into data analytics: cleaning the messy details, finding the signal, and turning it into something a team can act on. It’s a new lens on a familiar curiosity: <strong>how do we make things more useful?</strong></p>
            <p>That connection is the part I enjoy most. Good analysis needs dependable data; good software makes better data possible.</p>
          </div>
        </section>

        <section className={styles.feature} aria-labelledby="feature-title">
          <div className={styles.featureCopy}>
            <p className={styles.eyebrow}>A recent investigation <span className={styles.featureIndex}>01</span></p>
            <h2 id="feature-title">When a “unique” order ID <em>wasn’t.</em></h2>
            <p>While exploring a retail dataset, I found thousands of reused order IDs hiding in the source data. By creating a reliable composite key and rebuilding the analysis, I uncovered discounting patterns behind overall losses and a surprising gap in delivery reliability.</p>
            <Link className={styles.featureLink} href="/experience">See the work in context <span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.findingCard}>
            <div className={styles.findingHeader}><span className={styles.liveMark} /> THE DATA, RECONSIDERED <span>RETAIL · 2015—18</span></div>
            <div className={styles.findingNumbers}>
              <div><strong>474</strong><span>reused order IDs</span></div>
              <span className={styles.findingArrow} aria-hidden="true">→</span>
              <div className={styles.findingResult}><strong>5,122</strong><span>true orders resolved</span></div>
            </div>
            <div className={styles.findingDivider} />
            <p>One better key changed the story the dashboard could tell.</p>
            <div className={styles.findingFoot}><span>POWER BI · SQL · CURIOSITY</span><span>↗</span></div>
          </div>
          <span className={styles.featureAsterisk} aria-hidden="true">✳</span>
        </section>

        <AboutInteractions />

        <section className={styles.education} aria-labelledby="education-title">
          <p className={styles.eyebrow}>An unexpected starting point</p>
          <div className={styles.educationRow}>
            <h2 id="education-title">Nuclear engineering<br /><em>at Universiti Teknologi Malaysia.</em></h2>
            <p>My path into tech wasn’t a straight line. Engineering taught me to think in systems, test assumptions, and stay curious when the answer isn’t obvious. I still bring that mindset to every dataset and every product.</p>
          </div>
          <div className={styles.educationFoot}><span>UTM · 2017—2021</span><span>ANALYTICAL BY TRAINING, CURIOUS BY DEFAULT</span></div>
        </section>

        <footer className={styles.footer}>
          <div><p className={styles.eyebrow}>Good work starts with a conversation</p><h2>Have something<br /><em>worth figuring out?</em></h2></div>
          <div className={styles.footerActions}>
            <a className={styles.resumeLink} href="/about/resume.pdf" download>Download résumé <span aria-hidden="true">↓</span></a>
            <Link className={styles.footerLink} href="/contact">Let’s talk <span aria-hidden="true">↗</span></Link>
          </div>
          <span className={styles.footerMotif} aria-hidden="true">☼</span>
        </footer>
      </main>
    </div>
  );
}
