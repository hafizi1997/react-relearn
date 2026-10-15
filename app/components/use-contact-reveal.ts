"use client";

import { useEffect, type RefObject } from "react";

export function useContactReveal(sectionRef: RefObject<HTMLElement | null>) {
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
      section.dataset.reveal = String(
        point.x >= rect.left && point.x <= rect.right &&
        point.y >= rect.top && point.y <= rect.bottom,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
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
        ? null
        : { x: event.clientX, y: event.clientY };
    };
    const up = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !touchStart) return;
      const distance = Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y);
      touchStart = null;
      if (distance > 12) return;
      if (section.dataset.reveal === "true") hide();
      else {
        point = { x: event.clientX, y: event.clientY };
        update();
      }
    };
    const leave = (event: PointerEvent) => {
      if (event.pointerType !== "touch") hide();
    };
    const cancel = () => {
      touchStart = null;
      hide();
    };

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
  }, [sectionRef]);
}
