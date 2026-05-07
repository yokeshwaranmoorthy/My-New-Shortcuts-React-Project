import * as React from "react";
import { ITabData } from "../INewShortcutsAppProps";
import {
  fetchBestTabData,
  fetchSalesforceTabData,
  fetchPrecisionTabData,
} from "../Services/ApiService";
import { isApiDrivenTab, TTabLabel } from "../tabConfig";

const STATIC_TAB_DATA: ITabData[] = [
  {
    label: "Best",
    statusCounts: [],
    navigateLabel: "Navigate to Best",
    navigateUrl: "https://bestportal.in.pwc.com/",
    items: [],
  },
  {
    label: "Precision",
    statusCounts: [],
    navigateLabel: "Navigate to Precision",
    navigateUrl:
      "https://fa-eqad-saasfaprod1.fa.ocs.oraclecloud.com/fscmUI/faces/FuseWelcome?_adf.ctrl-state=2mjylxbe2_1&_adf.no-new-window-redirect=true&_afrLoop=59403678975127533&_afrWindowMode=2&_afrWindowId=null&_afrFS=16&_afrMT=screen&_afrMFW=1528&_afrMFH=794&_afrMFDW=1536&_afrMFDH=960&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=120&_afrMFG=0&_afrMFS=0&_afrMFO=0",
    items: [],
  },
  {
    label: "Salesforce - Non Regulated",
    statusCounts: [],
    navigateLabel: "Navigate to Salesforce",
    navigateUrl: "https://pwc.lightning.force.com/lightning/page/home",
    items: [],
  },
];

export interface IUseTabDataReturn {
  tabData: ITabData[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  loading: boolean;
  error: string | null;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
}

export function useTabData(userEmail: string): IUseTabDataReturn {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [tabData, setTabData] = React.useState<ITabData[]>(STATIC_TAB_DATA);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null,
  );
 // const hardcodeemails = "khushboo.x.gupta@pwc.com";
  // const precisonplusemails="shveta.verma@pwc.com"
  const loadApiTab = React.useCallback(
    async (label: TTabLabel): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const apiTabResult =
          label === "Best"
            ? await fetchBestTabData(userEmail)
            : label === "Precision"
              ? await fetchPrecisionTabData(userEmail)
              : await fetchSalesforceTabData(userEmail);

        if (apiTabResult?.items?.length > 0) {
          setTabData((allTabs) =>
            allTabs.map((eachTab) =>
              eachTab.label === label
                ? {
                    ...eachTab,
                    items: apiTabResult.items,
                    statusCounts: apiTabResult.statusCounts,
                  }
                : eachTab,
            ),
          );
          if (
            (label === "Best" || label === "Precision") &&
            apiTabResult.statusCounts?.length > 0
          ) {
            setSelectedStatus(apiTabResult.statusCounts[0].label);
          }
        } else {
          setError("No records found.");
        }
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "An unexpected error occurred.",
        );
      } finally {
        setLoading(false);
      }
    },
    [userEmail],
  );

  React.useEffect(() => {
    setSelectedStatus(null);
    setError(null);
    setTabData((allTabs) =>
      allTabs.map((eachTab) =>
        isApiDrivenTab(eachTab.label)
          ? { ...eachTab, items: [], statusCounts: [] }
          : eachTab,
      ),
    );

    const activeTabLabel = STATIC_TAB_DATA[activeTab]?.label as TTabLabel;
    if (isApiDrivenTab(activeTabLabel)) {
      loadApiTab(activeTabLabel).catch(() => {
        /* handled inside */
      });
    }
  }, [activeTab, userEmail, loadApiTab]);

  return {
    tabData,
    activeTab,
    setActiveTab,
    loading,
    error,
    selectedStatus,
    setSelectedStatus,
  };
}
