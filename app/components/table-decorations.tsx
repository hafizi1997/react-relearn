import styles from "../(site)/home.module.css";

export function TableDecorations() {
  return (
    <div className={styles.tableDecorations} aria-hidden="true">
      <span className={`${styles.tableFlower} ${styles.tableFloralLeft}`} />
      <span className={`${styles.tableFlower} ${styles.tableOrnamentLeft}`} />
      <span className={`${styles.tableFlower} ${styles.tableSprigRight}`} />
      <span className={`${styles.tableFlower} ${styles.tableFloralRight}`} />
    </div>
  );
}
