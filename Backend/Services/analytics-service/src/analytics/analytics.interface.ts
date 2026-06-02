export interface UsageEvent {
  userId: string;
  apiKey: string;
  endpoint: string;
  method: string;
  allowed: boolean;
  clientUserId: string;
  clientUserIp: string;
  timestamp: Date;
}
