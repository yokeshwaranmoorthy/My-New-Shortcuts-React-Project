// ── Level 2: Pure transformation — raw API shape → app domain types ────────

import { IShortcutItem, IStatusCount } from "../INewShortcutsAppProps";

export interface IRawPrecisionItem {
  transaction_id: number;
  notify_subject: string;
  requested_from_email: string;
  approval_type: string;
  approval_name: string;
  notification_status: string;
  contract_number: string;
  pcs_id: string;
  process_name: string;
  sent_date: string;
}

export interface IPrecisionApiResponse {
  items: IRawPrecisionItem[];
  hasMore: boolean;
  limit: number;
  offset: number;
  count: number;
}

export function transformPrecisionItems(
  rawItems: IRawPrecisionItem[],
): IShortcutItem[] {
  return rawItems.map((item) => {
    const subject = item.notify_subject || "";
    // Break before "Action Required:" so ticket number stays on line 1
    const formattedDescription = subject.replace(
      "Action Required:",
      "<br>Action Required:",
    );
    return {
      id: String(item.transaction_id),
      ticketNumber: String(item.transaction_id),
      description: formattedDescription,
      requestor: item.requested_from_email || "",
      category: item.approval_type || "",
      status: item.approval_name || "",
      url: "",
    };
  });
}

export function buildPrecisionStatusCounts(
  rawItems: IRawPrecisionItem[],
): IStatusCount[] {
  const countMap: Record<string, number> = {};
  rawItems.forEach((item) => {
    const key = item.approval_name || "Unknown";
    countMap[key] = (countMap[key] || 0) + 1;
  });
  return Object.keys(countMap).map((label) => ({
    label,
    count: countMap[label],
  }));
}

export interface IRawBestItem {
  REQUEST_ID: string;
  SHORT_DESCRIPTION: string;
  RAISED_BY: string;
  REQUEST_TYPE: string;
  REQUEST_STATUS: string;
  PENDING_NAME: string;
}

export interface IRawSalesforceRecord {
  // Standard Salesforce record metadata
  Id: string;
  attributes?: { type: string; url: string };

  // SOQL SELECT columns
  Assessment_Name__c: string; 
  Task_Details__c: string; 
  Assigned_To_Name__c: string; 
  Task_Name__c: string; 
  Assessment_Detail_Link__c: string; 
  Status__c?: string; 
  Assigned_to__c?: string; 
  Approval_Status__c?: string;
}

export interface ISalesforceQueryResponse {
  records: IRawSalesforceRecord[];
  totalSize: number;
  done: boolean;
}

export function transformBestItems(
  rawBestItems: IRawBestItem[],
): IShortcutItem[] {
  return rawBestItems.map((rawBestItem, index) => ({
    id: rawBestItem?.REQUEST_ID || String(index),
    ticketNumber: rawBestItem?.REQUEST_ID || "",
    description:
      rawBestItem?.SHORT_DESCRIPTION ||
      "Quickly access your most-used tools and important links in one place",
    requestor: rawBestItem?.RAISED_BY || "",
    category: rawBestItem?.REQUEST_STATUS || "",
    status: rawBestItem?.REQUEST_STATUS || "",
    url: "",
  }));
}

export function buildStatusCounts(
  rawBestItems: IRawBestItem[],
): IStatusCount[] {
  const statusCountMap: Record<string, number> = {};
  rawBestItems.forEach((rawBestItem) => {
    const statusKey = rawBestItem?.REQUEST_STATUS || "Unknown";
    statusCountMap[statusKey] = (statusCountMap[statusKey] || 0) + 1;
  });
  return Object.keys(statusCountMap).map((statusLabel) => ({
    label: statusLabel,
    count: statusCountMap[statusLabel],
  }));
}

function extractName(anchorHtml: string): string {
  const anchorTagMatch = anchorHtml?.match(/>([^<]+)<\/a>/) ?? null;
  return anchorTagMatch ? anchorTagMatch[1].trim() : anchorHtml || "";
}

export function transformSalesforceItems(
  rawSalesforceRecords: IRawSalesforceRecord[],
): IShortcutItem[] {
  return rawSalesforceRecords.map((rawSalesforceRecord) => ({
    id: rawSalesforceRecord?.Id,
    ticketNumber: `${rawSalesforceRecord?.Assessment_Name__c || ""}-${rawSalesforceRecord?.Id}`,
    description: rawSalesforceRecord?.Task_Details__c || "",
    requestor: extractName(rawSalesforceRecord?.Assigned_To_Name__c || ""),
    category: rawSalesforceRecord?.Task_Name__c || "",
    status: rawSalesforceRecord?.Status__c || "",
    url: rawSalesforceRecord?.Assessment_Detail_Link__c || "",
  }));
}
