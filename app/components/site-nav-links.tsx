"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  path: string;
  hash?: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", path: "/" },
  { href: "/concept", label: "My UI Concept", path: "/concept" },
  { href: "/about", label: "About", path: "/about" },
  { href: "/experience", label: "Experience", path: "/experience" },
];

function getHash() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hash.replace("#", "");
}

export function SiteNavLinks() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => setActiveHash(getHash());

    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = navItems
      .filter((item) => item.hash)
      .map((item) => document.getElementById(item.hash ?? ""))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHash(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const normalizedPathname = useMemo(() => pathname.replace(/\/$/, "") || "/", [pathname]);

  return (
    <div className="site-nav-links">
      {navItems.map((item) => {
        const isActive = item.hash
          ? normalizedPathname === item.path && activeHash === item.hash
          : normalizedPathname === item.path;

        return (
          <Link
            key={item.href}
            className={isActive ? "is-active" : undefined}
            href={item.href}
            aria-current={isActive ? (item.hash ? "location" : "page") : undefined}
            onClick={() => {
              if (item.hash) {
                setActiveHash(item.hash);
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
