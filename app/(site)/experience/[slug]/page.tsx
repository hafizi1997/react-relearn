import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { essays, getEssay } from "../essay-data";
import styles from "../essay.module.css";

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

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
          <p className={styles.eyebrow}>Essay · {essay.date}</p>
          <h1>{essay.title}</h1>
          <p className={styles.intro}>{essay.intro}</p>
        </header>
        <div className={styles.hero}>
          <Image src={essay.hero} alt={essay.heroAlt} fill priority sizes="(max-width: 900px) 100vw, 900px" />
        </div>
        <div className={styles.body}>
          {essay.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
