export const PRECISION_API_BASE_URL =
  "https://api.pwc.com/precisionplus/v1/flows/rest/INT890_BOT1_SEND_APPROV_NOTIFI/1.0/getNotifications";

export const PRECISION_API_HEADERS: Record<string, string> = {
  apikey: "l756b8f73aad704b4b84ec01c54e622265",
  apikeysecret: "10babdf9268c42e3acd68d9c0fecd88d",
  authorization: "Basic SU5UX0NIQVRCT1RfVVNFUjpSdU03cWVNUjI1VSU=",
  "proxy-authorization":
    "Basic SU5feGxvc19Qd0NfQXNzaXN0X3AwMDE6bHMmR0wvKSZQXnw4JDY+alVaZ1c=",
};

export const BEST_API_URL =
  "https://api-staging.pwc.com/PETrackerService/V1/SSCP2P/PendingRequest";

export const BEST_API_HEADERS: Record<string, string> = {
  apikey: "l7c600a76c56694347a46fc34f864eb5b9",
  apikeysecret: "bd1f7f93a5924626a0ec390ba70bc04a",
  authorization: "Q09HX0lOVF9VU1I6V2VsY29tZUAyMDIw",
  "content-type": "application/json",
  "proxy-authorization":
    "Basic SU5feGxvc19Db2duaXRpb25fczAwMjoxcjFNRzEwMTF5MjFUTEY1MWF1MQ==",
};

export const SF_API_BASE_URL = "https://api.pwc.com/services/data/v41.0/query/";

export const SF_SOQL_QUERY =
  `Select Id,Assessment_Name__c,Task_Details__c,Assigned_To_Name__c,Task_Name__c,` +
  `Assessment_Detail_Link__c,Status__c from RISK_Task__c ` +
  `where Assigned_to__c IN (SELECT Id FROM User WHERE Email='{EMAIL}') ` +
  `and Approval_Status__c NOT IN ('Approved','Cancelled','Rejected')`;

export const SF_API_HEADERS: Record<string, string> = {
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
