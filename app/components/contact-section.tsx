"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./contact-section.module.css";


// Supply real contact details here when available. Placeholder actions stay disabled.
const contact: { email: string; linkedin: string } = { email: "hafizikamal8@gmail.com", linkedin: "" };

export function ContactSection() {
  const [copyStatus, setCopyStatus] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    let point: { x: number; y: number } | null = null;
    let touchStart: { x: number; y: number } | null = null;
    const update = () => {
      frame = 0;
      if (!point) return;
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--reveal-x", `${point.x - rect.left}px`);
      section.style.setProperty("--reveal-y", `${point.y - rect.top}px`);
      section.dataset.reveal = String(point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const hide = () => {
      point = null;
      cancelAnimationFrame(frame);
      frame = 0;
      section.dataset.reveal = "false";
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      point = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      touchStart = event.target instanceof Element && event.target.closest("a, button")
        ? null : { x: event.clientX, y: event.clientY };
    };
    const up = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !touchStart) return;
      const distance = Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y);
      touchStart = null;
      if (distance > 12) return;
      if (section.dataset.reveal === "true") hide();
      else { point = { x: event.clientX, y: event.clientY }; update(); }
    };
    const leave = (event: PointerEvent) => { if (event.pointerType !== "touch") hide(); };
    const cancel = () => { touchStart = null; hide(); };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    section.addEventListener("pointerdown", down);
    section.addEventListener("pointerup", up);
    section.addEventListener("pointercancel", cancel);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", hide);
    window.addEventListener("blur", hide);
    return () => {
      hide();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      section.removeEventListener("pointerdown", down);
      section.removeEventListener("pointerup", up);
      section.removeEventListener("pointercancel", cancel);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);
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
        {contact.linkedin ? (
          <a className={styles.social} href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        ) : <span className={styles.social} aria-disabled="true" title="LinkedIn link coming soon">LinkedIn <span aria-hidden="true">↗</span></span>}
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
