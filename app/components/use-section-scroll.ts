"use client";

import { useEffect, type RefObject } from "react";
import { scrollPosition, smoothScrollPosition } from "./section-scroll";

export function useSectionScroll(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let touch: { x: number; y: number } | null = null;
    // Preserve fractional input from trackpads even when the browser rounds scrollY.
    let position = window.scrollY;
    let lastApplied = window.scrollY;
    let rendered = window.scrollY;
    let frame = 0;
    let lastTime = 0;

    const cancel = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      position = rendered = lastApplied = window.scrollY;
    };
    const tick = (now: number) => {
      frame = 0;
      // Scrollbar dragging, focus navigation and native scrolling take priority.
      if (motion.matches || window.scrollY !== lastApplied) { cancel(); return; }
      rendered = smoothScrollPosition(rendered, position, Math.min((now - lastTime) / 1000, .05));
      lastTime = now;
      const settled = Math.abs(position - rendered) < .25;
      if (settled) rendered = position;
      window.scrollTo({ top: rendered, behavior: "instant" });
      lastApplied = window.scrollY;
      if (!settled) frame = requestAnimationFrame(tick);
    };

    const ignore = (target: EventTarget | null, keyboard = false) => {
      if (!(target instanceof Element)) return false;
      if (target.closest(keyboard
        ? "input, textarea, select, button, a, [contenteditable], [role='dialog'], [data-native-scroll]"
        : "input, textarea, select, [contenteditable], [role='dialog'], [data-native-scroll]")) return true;
      // Leave nested scroll containers in control of their own content.
      for (let element: Element | null = target; element && element !== document.body; element = element.parentElement) {
        if (element.scrollHeight > element.clientHeight && /auto|scroll/.test(getComputedStyle(element).overflowY)) return true;
      }
      return false;
    };
    const move = (delta: number) => {
      if (!delta) return false;
      const current = window.scrollY;
      if (current !== lastApplied) cancel();
      const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height ?? 0;
      // Slow only the hero/table region. Release native scrolling as section 3
      // enters the viewport, and reapply the slowdown when returning above it.
      const rect = root.getBoundingClientRect();
      const start = Math.max(0, rect.top + current - navHeight);
      const end = Math.min(document.documentElement.scrollHeight - window.innerHeight,
        Math.max(start, rect.bottom + current - window.innerHeight));
      if (current < start - 1 || current > end + 1 ||
        (delta > 0 && current >= end - 1) || (delta < 0 && current <= start)) {
        cancel();
        return false;
      }
      // A reversal should respond immediately, without first exhausting momentum.
      if ((position - rendered) * delta < 0) position = rendered;
      position = scrollPosition(position, delta, start, end);
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
      return true;
    };
    const wheel = (event: WheelEvent) => {
      if (motion.matches || !event.cancelable || event.ctrlKey || event.defaultPrevented || ignore(event.target) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (move(delta)) event.preventDefault();
    };
    const key = (event: KeyboardEvent) => {
      if (["Escape", "Home", "End", "Tab"].includes(event.key)) { cancel(); return; }
      if (motion.matches || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || ignore(event.target, true)) return;
      const direction = event.key === " " ? (event.shiftKey ? -1 : 1)
        : ["ArrowDown", "PageDown"].includes(event.key) ? 1
        : ["ArrowUp", "PageUp"].includes(event.key) ? -1 : 0;
      if (!direction) return;
      if (move(direction * (event.key.startsWith("Arrow") ? 80 : window.innerHeight * .8))) event.preventDefault();
    };
    const touchStart = (event: TouchEvent) => {
      cancel();
      if (event.touches.length !== 1 || ignore(event.target)) { touch = null; return; }
      touch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };
    const touchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) { touch = null; return; }
      if (motion.matches || !event.cancelable || event.defaultPrevented || !touch) return;
      const point = event.touches[0];
      const delta = touch.y - point.clientY;
      const horizontal = touch.x - point.clientX;
      touch = { x: point.clientX, y: point.clientY };
      if (Math.abs(horizontal) > Math.abs(delta)) return;
      if (move(delta)) event.preventDefault();
    };
    const touchEnd = () => { touch = null; };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", touchEnd);
    window.addEventListener("touchcancel", touchEnd);
    window.addEventListener("resize", cancel);
    window.addEventListener("pointerdown", cancel);
    motion.addEventListener("change", cancel);
    return () => {
      cancel();
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("touchcancel", touchEnd);
      window.removeEventListener("resize", cancel);
      window.removeEventListener("pointerdown", cancel);
      motion.removeEventListener("change", cancel);
    };
  }, [rootRef]);
}
