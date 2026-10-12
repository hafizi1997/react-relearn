import { ContactSection } from "../components/contact-section";
import { HeroSection } from "../components/hero-section";
import { ChessSection } from "../components/chess-section";
import { ExperienceStatement } from "../components/experience-statement";
import styles from "./home.module.css";
import { HeroTransition } from "../components/hero-transition";
import { ProjectShowcase } from "../components/project-showcase";
import { VideoSection } from "../components/video-section";

export default function Home() {
  return (
    <div id="page-top" tabIndex={-1} className={`${styles.homeShell} page-shell hero-visual-page flex flex-col flex-1 items-center bg-background font-sans`}>
      <main className={`${styles.homeContent} content-grid flex-1 bg-surface`}>
        <HeroTransition hero={<HeroSection />} table={<ChessSection />} />
        <VideoSection />
        <ExperienceStatement />
        <ProjectShowcase />
        <ContactSection />
      </main>
    </div>
  );
}
