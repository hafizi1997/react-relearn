import Image from "next/image";
import Link from "next/link";
import { PageDecorations } from "../components/page-decorations";
import { HeroWau } from "../components/hero-wau";

export default function Home() {
  return (
    <div className="page-shell hero-visual-page flex flex-col flex-1 items-center bg-background font-sans">
      <PageDecorations />
      <main className="content-grid flex-1 bg-surface">
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
      </main>
    </div>
  );
}
