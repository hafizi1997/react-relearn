import Image from "next/image";
import { PageDecorations } from "../components/page-decorations";
import { HeroWau } from "../components/hero-wau";

export default function Home() {
  return (
    <div className="page-shell hero-visual-page flex flex-col flex-1 items-center bg-background font-sans">
      <PageDecorations />
      <main className="content-grid flex-1 bg-surface">
        <section className="hero-section" aria-label="Wau flying over Gunung Jerai">
          <Image
            className="hero-background"
            src="/hero/jerai-afternoon.webp"
            alt=""
            fill
            preload
            sizes="(max-width: 1023px) 1400px, 100vw"
          />
          <HeroWau />
        </section>
      </main>
    </div>
  );
}
