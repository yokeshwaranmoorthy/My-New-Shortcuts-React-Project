// ── Single source of truth for tab configuration ───────────────────────────
// To add a new tab: add an entry here. Nothing else needs to change.

export type TTabLabel =
  | "Email"
  | "Precision"
  | "Best"
  | "Salesforce - Non Regulated";

// Tabs that load data from an API (vs static data)
export const API_DRIVEN_TABS: TTabLabel[] = [
  "Best",
  "Salesforce - Non Regulated",
  "Precision",
];

export function isApiDrivenTab(label: string): boolean {
  return (API_DRIVEN_TABS as string[]).indexOf(label) !== -1;
}
