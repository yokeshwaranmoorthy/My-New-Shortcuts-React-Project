import { IShortcutItem, IStatusCount } from "../INewShortcutsAppProps";

export interface IBestTabResult {
  items: IShortcutItem[];
  statusCounts: IStatusCount[];
}

interface IRawBestItem {
  REQUEST_ID: string;
  SHORT_DESCRIPTION: string;
  RAISED_BY: string;
  REQUEST_TYPE: string;
  REQUEST_STATUS: string;
  PENDING_NAME: string;
}

const API_URL =
  "https://api-staging.pwc.com/PETrackerService/V1/SSCP2P/PendingRequest";

const API_HEADERS: { [key: string]: string } = {
  apikey: "l7c600a76c56694347a46fc34f864eb5b9",
  apikeysecret: "bd1f7f93a5924626a0ec390ba70bc04a",
  authorization: "Q09HX0lOVF9VU1I6V2VsY29tZUAyMDIw",
  "content-type": "application/json",
  "proxy-authorization":
    "Basic SU5feGxvc19Db2duaXRpb25fczAwMjoxcjFNRzEwMTF5MjFUTEY1MWF1MQ==",
};

export function fetchBestTabData(userEmail: string): Promise<IBestTabResult> {
  return fetch(API_URL, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify({ EmailId: userEmail }),
  })
    .then(function (response: Response) {
      if (!response.ok) {
        throw new Error(
          "API error: " + response.status + " " + response.statusText,
        );
      }
      return response.json();
    })
    .then(function (raw: IRawBestItem[]) {
      const items: IShortcutItem[] = raw.map(function (
        entry: IRawBestItem,
        index: number,
      ) {
        return {
          id: entry.REQUEST_ID || String(index),
          ticketNumber: entry.REQUEST_ID || "",
          description:
            entry.SHORT_DESCRIPTION ||
            "Quickly access your most-used tools and important links in one place",
          requestor: entry.RAISED_BY || "",
          category: entry.REQUEST_STATUS || "",
          status: entry.REQUEST_STATUS || "",
          url: "",
        };
      });

      const countMap: { [key: string]: number } = {};
      raw.forEach(function (entry: IRawBestItem) {
        const s = entry.REQUEST_STATUS || "Unknown";
        countMap[s] = (countMap[s] || 0) + 1;
      });

      const statusCounts: IStatusCount[] = Object.keys(countMap).map(function (
        key: string,
      ) {
        return { label: key, count: countMap[key] };
      });

      return { items: items, statusCounts: statusCounts };
    });
}
