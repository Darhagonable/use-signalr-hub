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
  onDisconnected?: (error?: Error) => void;
  onReconnecting?: (error?: Error) => void;
  onReconnected?: (connectionId?: string) => void;
  onError?: (error?: Error) => void;
  enabled?: boolean;
  automaticReconnect?: number[] | IRetryPolicy | boolean;
  connectionOptionsOrTransportType?: IHttpConnectionOptions | HttpTransportType;
  hubProtocol?: IHubProtocol;
  logging?: LogLevel | string | ILogger;
}