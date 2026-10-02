import type { ReactNode } from "react";
import { Sidebar, type SidebarItem } from "../components/sidebar";
import { SiteNav } from "../components/site-nav";
import styles from "./concept.module.css";

const items: SidebarItem[] = [
  { label: "Design Thinking", href: "#design-thinking" },
  { label: "The Big Idea", href: "#the-big-idea" },
  { label: "Design Principles", href: "#design-principles" },
  { label: "Visual Direction", href: "#visual-direction" },
  { label: "User Journey", href: "#user-journey" },
];

export default function ConceptLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.layout} concept-page-layout`}>
      <Sidebar items={items} title="On this page" />
      <div className={styles.mainColumn}>
        <SiteNav showLogo={false} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}