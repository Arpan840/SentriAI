export interface ApiControlConfig {
  apiKey: string;

  clientIdResolver?: (
    req: any,
  ) => string | null;

  limit?: number;

  windowSeconds?: number;

  telemetry?: {
    enabled: boolean;
    endpoint: string;
  };
}