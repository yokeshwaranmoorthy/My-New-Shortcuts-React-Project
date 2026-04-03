import { IShortcutItem, IStatusCount } from "../INewShortcutsAppProps";

export interface ITabResult {
  items: IShortcutItem[];
  statusCounts: IStatusCount[];
}
export type IBestTabResult = ITabResult;
export type ISalesforceTabResult = ITabResult;

interface IRawBestItem {
  REQUEST_ID: string;
  SHORT_DESCRIPTION: string;
  RAISED_BY: string;
  REQUEST_TYPE: string;
  REQUEST_STATUS: string;
  PENDING_NAME: string;
}
interface IRawSalesforceRecord {
  Id: string;
  Assessment_Name__c: string;
  Task_Details__c: string;
  Assigned_To_Name__c: string;
  Task_Name__c: string;
  Assessment_Detail_Link__c: string;
  Status__c?: string;
  attributes?: { type: string; url: string };
}

interface ISalesforceQueryResponse {
  records: IRawSalesforceRecord[];
  totalSize: number;
  done: boolean;
}

const BEST_API_URL =
  "https://api-staging.pwc.com/PETrackerService/V1/SSCP2P/PendingRequest";

const BEST_API_HEADERS: Record<string, string> = {
  apikey: "l7c600a76c56694347a46fc34f864eb5b9",
  apikeysecret: "bd1f7f93a5924626a0ec390ba70bc04a",
  authorization: "Q09HX0lOVF9VU1I6V2VsY29tZUAyMDIw",
  "content-type": "application/json",
  "proxy-authorization":
    "Basic SU5feGxvc19Db2duaXRpb25fczAwMjoxcjFNRzEwMTF5MjFUTEY1MWF1MQ==",
};

export function fetchBestTabData(userEmail: string): Promise<ITabResult> {
  return fetch(BEST_API_URL, {
    method: "POST",
    headers: BEST_API_HEADERS,
    body: JSON.stringify({ EmailId: userEmail }),
  })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(
          `BEST API error: ${response.status} ${response.statusText}`,
        );
      }
      return response.json();
    })
    .then((raw: IRawBestItem[]) => {
      const items: IShortcutItem[] = raw.map((entry, index) => ({
        id: entry?.REQUEST_ID || String(index),
        ticketNumber: entry?.REQUEST_ID || "",
        description:
          entry?.SHORT_DESCRIPTION ||
          "Quickly access your most-used tools and important links in one place",
        requestor: entry?.RAISED_BY || "",
        category: entry?.REQUEST_STATUS || "",
        status: entry?.REQUEST_STATUS || "",
        url: "",
      }));

      const countMap: Record<string, number> = {};
      raw.forEach((entry) => {
        const s = entry?.REQUEST_STATUS || "Unknown";
        countMap[s] = (countMap[s] || 0) + 1;
      });

      const statusCounts: IStatusCount[] = Object.keys(countMap).map((key) => ({
        label: key,
        count: countMap[key],
      }));

      return { items, statusCounts };
    });
}

function extractName(html: string): string {
  const match = html?.match(/>([^<]+)<\/a>/) ?? null;
  return match ? match?.[1]?.trim() : html || "";
}

const SF_API_BASE_URL =
  "https://api.pwcinternal.com:7443/services/data/v41.0/query/";

const SF_SOQL_QUERY =
  `Select Id,Assessment_Name__c,Task_Details__c,Assigned_To_Name__c,Task_Name__c,` +
  `Assessment_Detail_Link__c,Status__c from RISK_Task__c ` +
  `where Assigned_to__c IN (SELECT Id FROM User WHERE Email='{EMAIL}') ` +
  `and Approval_Status__c not in('Approved','Cancelled','Rejected')`;

const SF_API_HEADERS: Record<string, string> = {
  accept: "application/vnd.pwc--preview.cs110.my.salesforce.com+json",
  "accept-charset": "utf-8",
  apikey: "l7xx44cb2d5d93274a549c1fb41ba21fef18",
  apikeysecret: "d5d1a2082b834960b86584ee6903af6d",
  authorization: "Basic SU5faWZzX1VuaVJJc3FfczAwMToxazFacWgxazZxMXc5MWUxYVY=",
  client_id:
    "3MVG98_Psg5cppyY.y1VwK.P6fL1yOc88ENixSMapcNtc9Mi8sJbiAX9GsMydESfhmGR4yc3XQfuCxyRm_HRB",
  client_secret: "2181809414201584584",
  "content-type": "application/xml",
  password: "5bdWZbJbR3lgmcBDR5J9X7Q5RUX17xEuhjAfgi92aMZR",
  "proxy-authorization":
    "Basic SU5faWZzX1VuaVJJc3FfcDAwMTpwWkkxRTFsMXUxejcxMHgxSGs=",
  username: "unirisqintegration.in@pos.eu",
};

export async function fetchSalesforceTabData(
  userEmail: string,
): Promise<ITabResult> {
  const query = SF_SOQL_QUERY.replace("{EMAIL}", userEmail);
  const url = `${SF_API_BASE_URL}?q=${encodeURIComponent(query)}`;

  const response = await fetch(url, { method: "GET", headers: SF_API_HEADERS });

  if (!response.ok) {
    throw new Error(
      `Salesforce API error: ${response.status} ${response.statusText}`,
    );
  }

  const data: ISalesforceQueryResponse = await response.json();

  const items: IShortcutItem[] =
    data?.records?.map((record) => ({
      id: record?.Id,
      ticketNumber: `${record?.Assessment_Name__c || ""}-${record?.Id}`,
      description: record?.Task_Details__c || "",
      requestor: extractName(record?.Assigned_To_Name__c || ""),
      category: record?.Task_Name__c || "",
      status: record?.Status__c || "",
      url: record?.Assessment_Detail_Link__c || "",
    })) ?? [];

  return { items, statusCounts: [] };
}
