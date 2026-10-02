import Link from "next/link";
import { Mrs_Saint_Delafield } from "next/font/google";

const signatureFont = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export function SiteNav({ showLogo = true }: { showLogo?: boolean }) {
  return (
    <nav className="site-nav" data-show-logo={showLogo} aria-label="Main navigation">
      {showLogo && (
        <div className="site-nav-logo">
          <span className={signatureFont.className + " site-nav-signature"}>Hafizi</span>
          <svg className="site-nav-signature-underline" width="120" height="12" viewBox="0 0 300 30" aria-hidden="true">
            <path d="M8 22 C 90 6, 200 4, 292 14" fill="none" stroke="var(--highlight)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )}
      <div className="site-nav-glass">
        <div className="site-nav-links">
          <Link href="/concept">My UI Concept</Link>
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#experience">Experience</Link>
        </div>
        <div className="site-nav-actions">
          <Link className="site-nav-contact" href="/contact">Contact &rarr;</Link>
        </div>
      </div>
    </nav>
  );
}