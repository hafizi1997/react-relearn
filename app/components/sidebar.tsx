"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { SidebarFlowers } from "./sidebar-flowers";
import styles from "./sidebar.module.css";

export type SidebarItem = {
  label: string;
  href: `#${string}`;
};

type SidebarProps = {
  items: readonly SidebarItem[];
  title?: string;
};

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return "";
}

export function Sidebar({ items, title = "On this page" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigationId = useId();
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const activeHref = hash || items[0]?.href;

  return (
    <aside className={styles.sidebar} data-collapsed={collapsed}>
      <SidebarFlowers collapsed={collapsed} />
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          aria-controls={navigationId}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d={collapsed ? "m8 6 6 6-6 6m6-12 6 6-6 6" : "m16 6-6 6 6 6m-6-12-6 6 6 6"} />
          </svg>
        </button>
      </div>
      <nav id={navigationId} className={styles.navigation} aria-label={title}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={styles.link}
                aria-current={activeHref === item.href ? "location" : undefined}
                aria-label={item.label}
                title={collapsed ? item.label : undefined}
              >
                <span className={styles.iconPlaceholder} aria-hidden="true" />
                <span className={styles.label}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}