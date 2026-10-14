"use client";

import { useEffect, useRef } from "react";
import styles from "../(site)/home.module.css";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0.05;

    let inView = false;
    const syncPlayback = () => {
      if (inView && !document.hidden) {
        // Sound-enabled playback can be blocked until a user gesture.
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      syncPlayback();
    }, { threshold: [0, 0.5] });

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    document.addEventListener("click", syncPlayback);
    document.addEventListener("keydown", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      document.removeEventListener("click", syncPlayback);
      document.removeEventListener("keydown", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <section className={styles.videoSection} aria-label="Featured film">
      <video
        ref={videoRef}
        className={styles.featuredVideo}
        loop
        playsInline
        preload="metadata"
        aria-label="Featured portfolio video"
      >
        <source src="/video/shopping-cart-process-clean.mp4" type="video/mp4" />
        Your browser does not support embedded video. <a href="/video/shopping-cart-process-clean.mp4">Watch the video</a>.
      </video>
    </section>
  );
}
