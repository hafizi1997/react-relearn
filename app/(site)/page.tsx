import Image from "next/image";
import Link from "next/link";
import { PageDecorations } from "../components/page-decorations";

export default function Home() {
  return (
    <div className="page-shell flex flex-col flex-1 items-center bg-background font-sans">
      <PageDecorations />
      <main className="content-grid flex-1 bg-surface">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-content">
            <p className="hero-label">Build &middot; Analyse &middot; Solve</p>
            <h1 id="hero-heading">
              <strong>Hi, I&apos;m Hafizi.</strong>
              <span className="hero-heading-line">A Malaysian full-stack</span>{" "}
              <span className="hero-heading-line">developer transitioning</span>{" "}
              <span className="hero-heading-line">towards analytics.</span>
            </h1>
            <p className="hero-description">
              I build practical web applications, enjoy turning ideas into
              useful products, and I&apos;m currently deepening my skills in data
              and analytics.
            </p>
            <div className="hero-actions">
              <Link className="hero-primary-link" href="/#work">
                View my work <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link className="hero-secondary-link" href="/#about">
                More about me
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <Image
              src="/hero/hero.png"
              alt="Laptop dashboard workspace with plant and book"
              width={1672}
              height={941}
              preload
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
