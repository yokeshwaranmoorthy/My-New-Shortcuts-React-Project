import * as React from "react";
import styles from "./NewShortcutsApp.module.scss";
import type { INewShortcutsAppProps } from "./INewShortcutsAppProps";
import { useTabData } from "./hooks/useTabData";
import TabContent from "./TabContent";

const NewShortcutsApp: React.FC<INewShortcutsAppProps> = ({
  userDisplayName,
  userEmail,
}) => {
  const {
    tabData,
    activeTab,
    setActiveTab,
    loading,
    error,
    selectedStatus,
    setSelectedStatus,
  } = useTabData(userEmail);

  const activeTabData = tabData[activeTab];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <p className={styles.bannerSubtitle}>People Experience Portal</p>
        <h1 className={styles.bannerTitle}>One Approval</h1>
      </div>

      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          {tabData.map((tabItem, index) => (
            <button
              key={tabItem.label}
              className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tabItem.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <TabContent
          tab={activeTabData}
          loading={loading}
          error={error}
          selectedStatus={selectedStatus}
          onStatusClick={setSelectedStatus}
          userDisplayName={userDisplayName}
        />
      </div>
    </div>
  );
};

export default NewShortcutsApp;
