import * as React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styles from "./NewShortcutsApp.module.scss";
import { IShortcutItem, IStatusCount, ITabData } from "./INewShortcutsAppProps";
import ShortcutCard from "./ShortcutCard";
import StatBox from "./StatBox";
import { isApiDrivenTab as checkIsApiDrivenTab } from "./tabConfig";

interface ITabContentProps {
  tab: ITabData;
  loading: boolean;
  error: string | null;
  selectedStatus: string | null;
  onStatusClick: (label: string) => void;
  userDisplayName: string;
}

const TabContent: React.FC<ITabContentProps> = ({
  tab,
  loading,
  error,
  selectedStatus,
  onStatusClick,
  userDisplayName,
}) => {
  const isApiDrivenTab = checkIsApiDrivenTab(tab.label);

  const filteredShortcutItems: IShortcutItem[] =
    (tab.label === "Best" || tab.label === "Precision") && selectedStatus
      ? tab.items.filter((item) => item.status === selectedStatus)
      : (tab.items ?? []);

  return (
    <>
      <div className={styles.topRow}>
        <div className={styles.greeting}>
          <h2 className={styles.greetingName}>Hello {userDisplayName}</h2>
          <p className={styles.greetingSub}>Here are the approval</p>
        </div>
        <div className={styles.stats}>
          {!loading &&
            tab.statusCounts?.map((statusCount: IStatusCount) => (
              <StatBox
                key={statusCount.label}
                label={statusCount.label}
                count={statusCount.count}
                isActive={selectedStatus === statusCount.label}
                onClick={() => onStatusClick(statusCount.label)}
              />
            ))}
        </div>
      </div>

      {isApiDrivenTab && loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          <p>Loading...</p>
        </div>
      )}

      {isApiDrivenTab && error && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          <p style={{ color: "black" }}>{error}</p>
        </div>
      )}

      {(!isApiDrivenTab || (!loading && !error)) && (
        <div className={styles.cardsGrid}>
          {filteredShortcutItems.map((item: IShortcutItem) => (
            <ShortcutCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className={styles.navigateRow}>
        {tab.navigateUrl && (
          <a
            href={tab.navigateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navigateBtn}
          >
            <OpenInNewIcon />
            {tab.navigateLabel}
          </a>
        )}
      </div>
    </>
  );
};

export default TabContent;
