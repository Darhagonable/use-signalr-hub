import {
  HubConnection,
  IHttpConnectionOptions,
  LogLevel,
  ILogger,
  HttpTransportType,
  IHubProtocol,
  IRetryPolicy
} from "@microsoft/signalr";

export interface OOptions {
  onConnected?: (hub: HubConnection) => void;
  onDisconnected?: (error?: Error) => void;
  onReconnecting?: (error?: Error) => void;
  onReconnected?: (connectionId?: string) => void;
  onError?: (error?: Error) => void;
  enabled?: boolean;
  automaticReconnect?: number[] | IRetryPolicy | boolean;
  connectionOptions?: IHttpConnectionOptions;
  hubProtocol?: IHubProtocol;
  logging?: LogLevel | string | ILogger;
}

export interface TOptions {
  onConnected?: (hub: HubConnection) => void;
  onDisconnected?: (error?: Error) => void;
  onReconnecting?: (error?: Error) => void;
  onReconnected?: (connectionId?: string) => void;
  onError?: (error?: Error) => void;
  enabled?: boolean;
  automaticReconnect?: number[] | IRetryPolicy | boolean;
  transportType?: HttpTransportType;
  hubProtocol?: IHubProtocol;
  logging?: LogLevel | string | ILogger;
}

export type Options = OOptions | TOptions;