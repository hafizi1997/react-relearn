import { Mrs_Saint_Delafield } from "next/font/google";

const signatureFont = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <nav className="site-nav" aria-label="Main navigation">
        <div className="site-nav-brand">
          <span className={signatureFont.className + " site-nav-signature"}>
            Hafizi
          </span>
          <svg
            className="site-nav-signature-underline"
            width="120"
            height="12"
            viewBox="0 0 300 30"
            aria-hidden="true"
          >
            <path
              d="M8 22 C 90 6, 200 4, 292 14"
              fill="none"
              stroke="var(--highlight)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="site-nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
        </div>
        <div className="site-nav-actions">
          <a className="site-nav-contact" href="#contact">
            Contact &rarr;
          </a>
        </div>
      </nav>
      <div className="page-shell flex flex-col flex-1 items-center bg-background font-sans">
        <main className="content-grid flex-1 bg-surface">
          {/* Add your page sections here. */}
        </main>
      </div>
    </>
  );
}
