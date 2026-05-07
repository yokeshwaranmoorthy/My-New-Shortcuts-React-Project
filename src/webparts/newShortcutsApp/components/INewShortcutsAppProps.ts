export interface INewShortcutsAppProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  userEmail: string;
}

export interface IShortcutItem {
  id: string;
  ticketNumber: string; // REQUEST_ID
  description: string; // SHORT_DESCRIPTION
  requestor: string; // RAISED_BY
  category: string; // REQUEST_TYPE
  status: string; // REQUEST_STATUS
  url: string;
}

export interface IStatusCount {
  label: string;
  count: number;
}

export interface ITabData {
  label: string;
  statusCounts: IStatusCount[];
  navigateLabel: string;
  navigateUrl: string;
  items: IShortcutItem[];
}
