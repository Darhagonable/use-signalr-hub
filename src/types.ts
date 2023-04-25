import {
  HubConnection,
  IHttpConnectionOptions,
  LogLevel,
  ILogger,
  HttpTransportType,
  IHubProtocol,
  IRetryPolicy
} from "@microsoft/signalr";

export interface Options {
  onConnected?: (hub: HubConnection) => void;
  onDisconnected?: () => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
  automaticReconnect?: number[] | IRetryPolicy | boolean;
  httpTransportTypeOrOptions?: IHttpConnectionOptions | HttpTransportType;
  hubProtocol?: IHubProtocol;
  logging?: LogLevel | string | ILogger;
}