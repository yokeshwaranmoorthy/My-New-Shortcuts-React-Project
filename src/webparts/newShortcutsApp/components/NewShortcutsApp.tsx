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
import { fetchBestTabData } from "./Services/BestApiService";

const BEST_TAB_INDEX = 2
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
    navigateUrl: "https://pwcnetwork.service-now.com/hub",
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
    navigateUrl: "",
    items: [],
  },
  {
    label: "Salesforce",
    statusCounts: [
      { label: "Approval Completed", count: 18 },
      { label: "Approval Pending", count: 7 },
    ],
    navigateLabel: "Navigate to Salesforce",
    navigateUrl: "",
    items: [
      {
        id: "16",
        ticketNumber: "RITM13456975",
        description: "Salesforce permission update request.",
        requestor: "Arjun Menon",
        category: "Sales",
        status: "",
        url: "https://www.google.com/",
      },
      {
        id: "17",
        ticketNumber: "RITM13456975",
        description: "Salesforce permission update request.",
        requestor: "Arjun Menon",
        category: "Sales",
        status: "",
        url: "https://www.google.com/",
      },
      {
        id: "18",
        ticketNumber: "RITM13456975",
        description: "Salesforce permission update request.",
        requestor: "Arjun Menon",
        category: "Sales",
        status: "",
        url: "https://www.google.com/",
      },
      {
        id: "19",
        ticketNumber: "RITM13456975",
        description: "Salesforce permission update request.",
        requestor: "Arjun Menon",
        category: "Sales",
        status: "",
        url: "https://www.google.com/",
      },
      {
        id: "20",
        ticketNumber: "RITM13456975",
        description: "Salesforce permission update request.",
        requestor: "Arjun Menon",
        category: "Sales",
        status: "",
        url: "https://www.google.com/",
      },
    ],
  },
];

const ShortcutCard: React.FC<{ item: IShortcutItem }> = ({ item }) => (
  <div className={styles.card}>
    <p className={styles.cardTitle}>
      <span className={styles.ticketLink}>{item.ticketNumber}</span>
      {item.description ? <span>{` - ${item.description}`}</span> : null}
    </p>
    <p className={styles.cardRequestor}>
      <span className={styles.mailIcon}>✉</span>
      {item.requestor}
    </p>
    <div className={styles.cardFooter}>
      <span className={styles.cardCategory}>{item.category}</span>
      {/* {item.status ? <span className={styles.cardCategory}>{item.status}</span> : null} */}
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
  const hardcodeemails = "khushboo.x.gupta@pwc.com";

  // ── API call using async/await ──────────────────────────────────────────────
  const loadBestTabData = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchBestTabData(hardcodeemails);

      if (result.items.length > 0) {
        setTabData((prev) =>
          prev.map((tab, i) =>
            i === BEST_TAB_INDEX
              ? {
                  ...tab,
                  items: result.items,
                  statusCounts: result.statusCounts,
                }
              : tab,
          ),
        );
        // auto-select the first status as default filter
        if (result.statusCounts.length > 0) {
          setSelectedStatus(result.statusCounts[0].label);
        }
      } else {
        setError("No records found.");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setSelectedStatus(null);
    if (activeTab === BEST_TAB_INDEX) {
      // const storedEmail = localStorage.getItem("MyShortcutsEmail");
      // const emailToUse = storedEmail === "khushboo.x.gupta@pwc.com" ? storedEmail : userEmail;
      loadBestTabData(userEmail).catch(() => {
        /* handled inside */
      });
    }
  }, [activeTab]);

  const currentTab = tabData[activeTab];
  const visibleItems =
    activeTab === BEST_TAB_INDEX && selectedStatus
      ? currentTab.items.filter((item) => item.status === selectedStatus)
      : currentTab.items;

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
              currentTab.statusCounts.map((sc: IStatusCount) => (
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

        {activeTab === BEST_TAB_INDEX && loading && (
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
        {activeTab === BEST_TAB_INDEX && error && (
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

        {(!loading && !error) || activeTab !== BEST_TAB_INDEX ? (
          <div className={styles.cardsGrid}>
            {visibleItems.map((item: IShortcutItem) => (
              <ShortcutCard key={item.id} item={item} />
            ))}
          </div>
        ) : null}

        <div className={styles.navigateRow}>
          {currentTab.label === "Precision" && (
            <a
              href={currentTab.navigateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navigateBtn}
            >
              <OpenInNewIcon />
              {currentTab.navigateLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewShortcutsApp;
