// ── Level 3: HTTP transport — fetch + error handling only ──────────────────

import { IShortcutItem, IStatusCount } from "../INewShortcutsAppProps";
import {
  BEST_API_URL,
  BEST_API_HEADERS,
  SF_API_BASE_URL,
  SF_SOQL_QUERY,
  SF_API_HEADERS,
  PRECISION_API_BASE_URL,
  PRECISION_API_HEADERS,
} from "./apiConfig";
import {
  IRawBestItem,
  ISalesforceQueryResponse,
  transformBestItems,
  buildStatusCounts,
  transformSalesforceItems,
  IPrecisionApiResponse,
  transformPrecisionItems,
  buildPrecisionStatusCounts,
} from "./apiTransformers";

export interface ITabResult {
  items: IShortcutItem[];
  statusCounts: IStatusCount[];
}
export type IBestTabResult = ITabResult;
export type ISalesforceTabResult = ITabResult;

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
    .then((raw: IRawBestItem[]) => ({
      items: transformBestItems(raw),
      statusCounts: buildStatusCounts(raw),
    }));
}

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

  return {
    items: transformSalesforceItems(data?.records ?? []),
    statusCounts: [],
  };
}

export async function fetchPrecisionTabData(
  userEmail: string,
): Promise<ITabResult> {
  const lastRunTime = new Date().toISOString().split(".")[0];
  const url = `${PRECISION_API_BASE_URL}?p_last_run_time=${encodeURIComponent(lastRunTime)}&p_requested_to_email=${encodeURIComponent(userEmail)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: PRECISION_API_HEADERS,
  });

  if (!response.ok) {
    throw new Error(
      `Precision API error: ${response.status} ${response.statusText}`,
    );
  }

  const data: IPrecisionApiResponse = await response.json();

  return {
    items: transformPrecisionItems(data?.items ?? []),
    statusCounts: buildPrecisionStatusCounts(data?.items ?? []),
  };
}
