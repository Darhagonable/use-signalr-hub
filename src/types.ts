import {
  HubConnection,
  IHttpConnectionOptions,
  LogLevel,
  ILogger
} from "@microsoft/signalr";

export interface Options {
  onConnected?: (hub: HubConnection) => void;
  onDisconnected?: () => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
  automaticReconnect?: boolean;
  httpConnectionOptions?: IHttpConnectionOptions;
  logging?: LogLevel | string | ILogger;
}