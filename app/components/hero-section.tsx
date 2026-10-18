"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HeroWau } from "./hero-wau";
import { HeroAirflow } from "./hero-airflow";

const MotionLink = motion.create(Link);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.58, 1], [1, 1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.045]);

  const lineInitial = shouldReduceMotion ? false : { y: "115%", opacity: 0 };
  const itemInitial = shouldReduceMotion ? false : { y: 18, opacity: 0 };

  return (
    <section ref={sectionRef} className="hero-section" aria-labelledby="hero-heading">
      <motion.div
        className="hero-background-motion"
        style={{ scale: shouldReduceMotion ? 1 : backgroundScale }}
        aria-hidden="true"
      >
        <Image
          className="hero-background"
          src="/hero/jerai-afternoon.webp"
          alt=""
          fill
          preload
          sizes="(max-width: 1023px) 1400px, 100vw"
        />
      </motion.div>
      <HeroAirflow />
      <HeroWau />
      <motion.div
        className="hero-content"
        style={{
          y: shouldReduceMotion ? 0 : contentY,
          opacity: shouldReduceMotion ? 1 : contentOpacity,
        }}
      >
        <h1 id="hero-heading">
          <span className="hero-heading-clip">
            <motion.span
              className="hero-heading-line"
              initial={lineInitial}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Built with purpose.
            </motion.span>
          </span>
          <span className="hero-heading-clip">
            <motion.span
              className="hero-heading-line hero-heading-offset"
              initial={lineInitial}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.72, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Thoughtful by{" "}
              <motion.em
                initial={shouldReduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.62, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                design.
              </motion.em>
            </motion.span>
          </span>
        </h1>
        <div className="hero-actions">
          <MotionLink
            className="hero-primary-link"
            href="/experience"
            initial={itemInitial}
            animate={{ y: 0, opacity: 1 }}
            variants={{
              hover: { y: -3, scale: 1.025, transition: { duration: 0.18 } },
              tap: { y: 0, scale: 0.975, transition: { duration: 0.1 } },
            }}
            whileHover={shouldReduceMotion ? undefined : "hover"}
            whileTap={shouldReduceMotion ? undefined : "tap"}
            transition={{ duration: 0.5, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            View my work
            <motion.span
              aria-hidden="true"
              initial={false}
              variants={{
                hover: { x: 5, transition: { type: "spring", stiffness: 420, damping: 24 } },
              }}
            >
              &rarr;
            </motion.span>
          </MotionLink>
          <MotionLink
            className="hero-secondary-link"
            href="/about"
            initial={itemInitial}
            animate={{ y: 0, opacity: 1 }}
            variants={{
              hover: { y: -2, transition: { duration: 0.18 } },
              tap: { scale: 0.97, transition: { duration: 0.1 } },
            }}
            whileHover={shouldReduceMotion ? undefined : "hover"}
            whileTap={shouldReduceMotion ? undefined : "tap"}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            About me
          </MotionLink>
        </div>
      </motion.div>
    </section>
  );
}
