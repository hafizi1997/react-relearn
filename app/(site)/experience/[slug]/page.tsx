import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { essays, getEssay } from "../essay-data";
import { ArticleToc } from "../article-toc";
import styles from "../essay.module.css";

export function generateStaticParams() { return essays.map((essay) => ({ slug: essay.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  return essay ? { title: essay.title, description: essay.intro } : { title: "Essay" };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link className={styles.back} href="/experience">← Back to experience</Link>
        <header className={styles.header}>
          <h1>{essay.title}</h1>
          <p className={styles.intro}>{essay.intro}</p>
          <div className={styles.meta}><span>Hafizi</span><span>·</span><time>{essay.date}</time><span>·</span><span>5 min read</span></div>
        </header>
        <div className={styles.articleGrid}>
          <div className={styles.articleContent}>
            <div className={`${styles.hero} ${essay.hero ? "" : styles.placeholder}`}>
              {essay.hero ? <Image src={essay.hero} alt={essay.heroAlt} fill priority sizes="(max-width: 900px) 100vw, 900px" /> : <div className={styles.placeholderCard}><span>Image placeholder</span><strong>Development → Data Analysis</strong><small>Hero artwork will be added later</small></div>}
            </div>
            <div className={styles.body}>
              {essay.sections.map((section, index) => <section key={section.heading} id={`section-${index + 1}`}>
                <p className={styles.sectionLabel}>{String(index + 1).padStart(2, "0")} / {index === essay.sections.length - 1 ? "LOOKING AHEAD" : "THE JOURNEY"}</p>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {section.mediaSrc ? (
                  <div className={styles.inlineImage}>
                    <Image src={section.mediaSrc} alt={section.mediaAlt ?? ""} fill sizes="(max-width: 900px) 100vw, 680px" />
                  </div>
                ) : section.mediaLabel && <div className={styles.inlinePlaceholder} aria-label={section.mediaLabel}>{section.mediaLabel}</div>}
              </section>)}
            </div>
          </div>
          <ArticleToc headings={essay.sections.map((section) => section.heading)} />
        </div>
      </article>
    </main>
  );
}
