"use client";

import { useEffect, useRef, useState } from "react";
import { useContactReveal } from "./use-contact-reveal";
import styles from "./contact-section.module.css";


const contact = { email: "hafizikamal8@gmail.com" };

export function ContactSection() {
  const [copyStatus, setCopyStatus] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  useContactReveal(sectionRef);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (resetRef.current) clearTimeout(resetRef.current); }, []);

  const copyEmail = async () => {
    if (!contact.email) return;
    if (resetRef.current) clearTimeout(resetRef.current);
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus("Please select and copy the email address.");
    }
    resetRef.current = setTimeout(() => setCopyStatus(""), 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.futureBackground} aria-hidden="true" />
      <div className={styles.content}>
        <h2 id="contact-heading" className={styles.heading}>
          <em>Let’s make it happen.</em>
        </h2>
        <div className={styles.emailRow}>
          <span>{contact.email || "you@example.com"}</span>
          <button className={styles.copy} type="button" onClick={copyEmail} disabled={!contact.email} aria-label="Copy email address">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="8" y="8" width="12" height="13" rx="2" />
              <path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
          <span className={styles.copyStatus} role="status">{copyStatus}</span>
        </div>
      </div>
      <footer className={styles.footer}>
        <small>© 2026 Hafizi</small>
        <a href="#page-top" onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "instant" });
          document.getElementById("page-top")?.focus({ preventScroll: true });
        }}>Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </section>
  );
}
