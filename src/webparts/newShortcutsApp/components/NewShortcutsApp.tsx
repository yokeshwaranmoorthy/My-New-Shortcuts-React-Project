import * as React from "react";
import styles from "./NewShortcutsApp.module.scss";
import type {
  INewShortcutsAppProps,
  IShortcutItem,
  IStatusCount,
  ITabData,
} from "./INewShortcutsAppProps";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  fetchBestTabData,
  fetchSalesforceTabData,
} from "./Services/ApiService";

const STATIC_TAB_DATA: ITabData[] = [
  {
    label: "Email",
    statusCounts: [
      { label: "Approval Completed", count: 15 },
      { label: "Approval Pending", count: 8 },
    ],
    navigateLabel: "Navigate to Email",
    navigateUrl: "",
    items: [
      {
        id: "1",
        ticketNumber: "RITM13456970",
        description: "Request for groups and server management in CyberArk.",
        requestor: "Ayushi Bamroliya",
        category: "Business Development",
        status: "",
        url: "https://www.google.com/",
      },
      {
        id: "2",
        ticketNumber: "RITM13456971",
        description:
          "Access requests for Exchange Online mailbox configuration.",
        requestor: "Rahul Sharma",
        category: "IT Operations",
        status: "",
        url: "https://www.google.com/maps",
      },
      {
        id: "3",
        ticketNumber: "RITM13456970",
        description: "Request for group and server management in CyberArk.",
        requestor: "Ayushi Bamroliya",
        category: "Business Development",
        status: "",
        url: "https://www.google.com/",
      },
      {
        id: "4",
        ticketNumber: "RITM13456971",
        description:
          "Access request for Exchange Online mailbox configuration.",
        requestor: "Rahul Sharma",
        category: "IT Operations",
        status: "",
        url: "https://www.google.com/maps",
      },
      {
        id: "5",
        ticketNumber: "RITM13456971",
        description:
          "Access request for Exchange Online mailbox configuration.",
        requestor: "Rahul Sharma",
        category: "IT Operations",
        status: "",
        url: "https://www.google.com/maps",
      },
    ],
  },
  {
    label: "Precision",
    statusCounts: [
      { label: "Approval Completed", count: 20 },
      { label: "Approval Pending", count: 10 },
    ],
    navigateLabel: "Navigate to Precision",
    navigateUrl:
      "https://fa-eqad-saasfaprod1.fa.ocs.oraclecloud.com/fscmUI/faces/FuseWelcome?_adf.ctrl-state=2mjylxbe2_1&_adf.no-new-window-redirect=true&_afrLoop=59403678975127533&_afrWindowMode=2&_afrWindowId=null&_afrFS=16&_afrMT=screen&_afrMFW=1528&_afrMFH=794&_afrMFDW=1536&_afrMFDH=960&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=120&_afrMFG=0&_afrMFS=0&_afrMFO=0",
    items: [
      {
        id: "6",
        ticketNumber: "RITM13456972",
        description: "Email distribution list creation for marketing team.",
        requestor: "Priya Nair",
        category: "Marketing",
        status: "",
        url: "https://www.google.com/maps",
      },
      {
        id: "7",
        ticketNumber: "RITM13456973",
        description: "Shared mailbox setup for customer support queue.",
        requestor: "Vikram Patel",
        category: "Customer Support",
        status: "",
        url: "https://www.google.com/maps",
      },
      {
        id: "8",
        ticketNumber: "RITM13456972",
        description: "Email distribution list creation for marketing team.",
        requestor: "Priya Nair",
        category: "Marketing",
        status: "",
        url: "https://www.google.com/maps",
      },
      {
        id: "9",
        ticketNumber: "RITM13456973",
        description: "Shared mailbox setup for customer support queue.",
        requestor: "Vikram Patel",
        category: "Customer Support",
        status: "",
        url: "https://www.google.com/maps",
      },
      {
        id: "10",
        ticketNumber: "RITM13456973",
        description: "Shared mailbox setup for customer support queue.",
        requestor: "Vikram Patel",
        category: "Customer Support",
        status: "",
        url: "https://www.google.com/maps",
      },
    ],
  },
  {
    label: "Best",
    statusCounts: [],
    navigateLabel: "Navigate to Best",
    navigateUrl: "https://bestportal.in.pwc.com/",
    items: [],
  },
  {
    label: "Salesforce",
    statusCounts: [],
    navigateLabel: "Navigate to Salesforce",
    navigateUrl: "https://pwc.lightning.force.com/lightning/page/home",
    items: [],
  },
];

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

const StatBox: React.FC<{
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, count, isActive, onClick }) => (
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

const NewShortcutsApp: React.FC<INewShortcutsAppProps> = ({
  userDisplayName,
  userEmail,
}) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [tabData, setTabData] = React.useState<ITabData[]>(STATIC_TAB_DATA);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null,
  );
  //const hardcodebestemails = "khushboo.x.gupta@pwc.com";

  // ── API call using async/await ──────────────────────────────────────────────
  const loadBestTabData = React.useCallback(
    async (email: string): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchBestTabData(email);
        console.log("Best API result:", result);
        console.log("Items:", result.items);
        console.log("StatusCounts:", result.statusCounts);

        if (result?.items?.length > 0) {
          setTabData((prev) =>
            prev.map((tab) =>
              tab.label === "Best"
                ? {
                    ...tab,
                    items: result?.items,
                    statusCounts: result?.statusCounts,
                  }
                : tab,
            ),
          );

          if (result?.statusCounts?.length > 0) {
            setSelectedStatus(result?.statusCounts?.[0]?.label);
          }
        } else {
          setError("No records found.");
        }
      } catch (err) {
        console.log("API Error:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const loadSalesforceTabData = React.useCallback(
    async (email: string): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchSalesforceTabData(email);
        console.log("resultresultresult", result);

        if (result?.items?.length > 0) {
          setTabData((prev) =>
            prev.map((tab) =>
              tab.label === "Salesforce"
                ? {
                    ...tab,
                    items: result?.items,
                    statusCounts: result?.statusCounts,
                  }
                : tab,
            ),
          );
        } else {
          setError("No records found.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  React.useEffect(() => {
    setSelectedStatus(null);
    setError(null);

    // Clear stale API tab data so fresh data always loads on return
    setTabData((prev) =>
      prev.map((tab) =>
        tab.label === "Best" || tab.label === "Salesforce"
          ? { ...tab, items: [], statusCounts: [] }
          : tab,
      ),
    );

    // Use STATIC_TAB_DATA to read the label — avoids re-triggering when tabData state updates
    const currentLabel = STATIC_TAB_DATA[activeTab]?.label;
    console.log("currentLabel", currentLabel);

    if (currentLabel === "Best") {
      loadBestTabData(userEmail).catch(() => {
      });
    } else if (currentLabel === "Salesforce") {
      loadSalesforceTabData(userEmail).catch(() => {
      });
    }
    // Precision uses static data — no API call needed
  }, [activeTab, userEmail]);

  const currentTab = tabData?.[activeTab];
  const visibleItems =
    currentTab?.label === "Best" && selectedStatus
      ? currentTab?.items?.filter((item) => item?.status === selectedStatus)
      : (currentTab?.items ?? []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <p className={styles.bannerSubtitle}>People Experience Portal</p>
        <h1 className={styles.bannerTitle}>
          Elevate productivity with streamlined access!
        </h1>
      </div>

      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          {tabData.map((tab, index) => (
            <button
              key={tab.label}
              className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div className={styles.greeting}>
            <h2 className={styles.greetingName}>Hello {userDisplayName}</h2>
            <p className={styles.greetingSub}>Here are the approval</p>
          </div>
          <div className={styles.stats}>
            {!loading &&
              currentTab?.statusCounts?.map((sc: IStatusCount) => (
                <StatBox
                  key={sc.label}
                  label={sc.label}
                  count={sc.count}
                  isActive={selectedStatus === sc.label}
                  onClick={() => setSelectedStatus(sc.label)}
                />
              ))}
          </div>
        </div>

        {(currentTab?.label === "Best" || currentTab?.label === "Salesforce") &&
          loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 0",
              }}
            >
              <p>Loading...</p>
            </div>
          )}
        {(currentTab?.label === "Best" || currentTab?.label === "Salesforce") &&
          error && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 0",
              }}
            >
              <p style={{ color: "black" }}>{error}</p>
            </div>
          )}

        {(currentTab?.label !== "Best" && currentTab?.label !== "Salesforce") || (!loading && !error) ? (
          <div className={styles.cardsGrid}>
            {visibleItems?.map((item: IShortcutItem) => (
              <ShortcutCard key={item?.id} item={item} />
            ))}
          </div>
        ) : null}

        <div className={styles.navigateRow}>
          {currentTab?.navigateUrl && (
            <a
              href={currentTab?.navigateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navigateBtn}
            >
              <OpenInNewIcon />
              {currentTab?.navigateLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewShortcutsApp;
