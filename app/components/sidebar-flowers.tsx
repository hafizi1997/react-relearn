import styles from "./sidebar-flowers.module.css";

const decorations = [styles.sprig, styles.ornament, styles.floral];

type SidebarFlowersProps = {
  collapsed?: boolean;
  showBackgroundFlower?: boolean;
};

export function SidebarFlowers({
  collapsed = false,
  showBackgroundFlower = true,
}: SidebarFlowersProps) {
  return (
    <div
      className={styles.flowers}
      data-collapsed={collapsed}
      data-background-flower={showBackgroundFlower}
      aria-hidden="true"
    >
      {decorations.map((className) => (
        <span key={className} className={`${styles.decor} ${className}`} />
      ))}
    </div>
  );
}
