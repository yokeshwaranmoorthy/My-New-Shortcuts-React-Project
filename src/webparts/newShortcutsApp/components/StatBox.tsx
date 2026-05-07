import * as React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import styles from "./NewShortcutsApp.module.scss";

interface IStatBoxProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const StatBox: React.FC<IStatBoxProps> = ({
  label,
  count,
  isActive,
  onClick,
}) => (
  <div
    className={`${styles.statBox} ${isActive ? styles.activeStatBox : ""}`}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <span className={styles.statIcon}>
      <CalendarMonthIcon />
    </span>
    <span className={styles.statLabel}>{label}</span>
    <span className={styles.statCount}>{count}</span>
  </div>
);

export default StatBox;
