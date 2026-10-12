"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./click-word.module.css";

const colors = ["red", "yellow", "blue", "green"] as const;

export function ClickWord() {
  const [index, setIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const attentionRef = useRef<Animation | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const section = button?.closest("section");
    if (!button || !section || hasClicked) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let attempts = 0;
    let repeat: number | undefined;
    const stop = () => {
      window.clearTimeout(repeat);
      repeat = undefined;
      attentionRef.current?.cancel();
      attentionRef.current = null;
    };
    const play = () => {
      if (!visible || motion.matches || attempts >= 2) return;
      attempts += 1;
      // Hover and keyboard focus already signal that the visitor found the button.
      if (!button.matches(":hover, :focus-visible")) {
        attentionRef.current = button.animate([
          { transform: "translateY(0) rotate(0deg)" },
          { transform: "translateY(-.07em) rotate(-4deg)", offset: .22 },
          { transform: "translateY(-.07em) rotate(4deg)", offset: .4 },
          { transform: "translateY(-.05em) rotate(-3deg)", offset: .58 },
          { transform: "translateY(-.03em) rotate(2deg)", offset: .76 },
          { transform: "translateY(0) rotate(0deg)" },
        ], { duration: 900, easing: "ease-in-out" });
      }
      if (attempts < 2) repeat = window.setTimeout(play, 3900);
    };
    // On tall/mobile sections, require half a viewport rather than half the
    // entire section so the entrance cue remains reachable.
    const threshold = Math.min(.5, window.innerHeight / Math.max(1, section.getBoundingClientRect().height) * .5);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= threshold;
      if (!visible) stop();
      else if (repeat === undefined) play();
    }, { threshold });
    observer.observe(section);
    motion.addEventListener("change", stop);
    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener("change", stop);
    };
  }, [hasClicked]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.button}
      data-color={colors[index]}
      aria-label={`click — change button color (currently ${colors[index]})`}
      onPointerEnter={() => attentionRef.current?.cancel()}
      onFocus={() => attentionRef.current?.cancel()}
      onClick={() => {
        attentionRef.current?.cancel();
        setHasClicked(true);
        setIndex((current) => (current + 1) % colors.length);
      }}
    >
      click
    </button>
  );
}
