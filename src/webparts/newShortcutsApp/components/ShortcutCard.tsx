import * as React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styles from "./NewShortcutsApp.module.scss";
import { IShortcutItem } from "./INewShortcutsAppProps";

const ShortcutCard: React.FC<{ item: IShortcutItem }> = ({ item }) => (
  <div className={styles.card}>
    <p className={styles.cardTitle}>
      <span className={styles.ticketLink}>{item.ticketNumber}</span>
      {item.description ? (
        <span dangerouslySetInnerHTML={{ __html: ` ${item.description}` }} />
      ) : null}
    </p>
    <p className={styles.cardRequestor}>
      <span className={styles.mailIcon}>✉</span>
      {item.requestor}
    </p>
    <div className={styles.cardFooter}>
      <span className={styles.cardCategory}>{item.category}</span>
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.redirectIcon}
          title="Open link"
        >
          <OpenInNewIcon />
        </a>
      ) : null}
    </div>
  </div>
);

export default ShortcutCard;
