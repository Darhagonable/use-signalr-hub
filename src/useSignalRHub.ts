import { useState, useEffect, useRef } from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState
} from "@microsoft/signalr";

import { Options } from "./types";
import { defaultOptions } from "./globals";

export default function useSignalRHub(hubUrl: string, options?: Options) {

  const [signalRHub, setSignalRHub] = useState<HubConnection | null>(null);

  const optionsRef = useRef({...defaultOptions, ...options});

  useEffect(() => {
    optionsRef.current = {...defaultOptions, ...options};
  }, [options]);

  useEffect(() => {
    if(!optionsRef.current.enabled) return;
    let canceled = false;

    const hubConnectionSetup = new HubConnectionBuilder();

    hubConnectionSetup.withUrl(hubUrl, {
      ...optionsRef.current.httpConnectionOptions
    });

    if(optionsRef.current.automaticReconnect)
      hubConnectionSetup.withAutomaticReconnect();

    if(optionsRef.current.logging)
      hubConnectionSetup.configureLogging(optionsRef.current.logging);

    const hubConnection = hubConnectionSetup.build();

    hubConnection
      .start()
      .then(() => {
        if (canceled) {
          hubConnection.stop();
          return;
        }
        setSignalRHub(hubConnection);
        optionsRef.current.onConnected?.(hubConnection);
      })
      .catch((error) => {
        if (canceled) return;
        optionsRef.current.onError?.(error);
      });

    return () => {
      canceled = true;
      optionsRef.current.onDisconnected?.();
      setSignalRHub(null);
      if (hubConnection.state === HubConnectionState.Connected)
        hubConnection.stop();
    };
  }, [hubUrl, optionsRef.current.enabled]);

  return signalRHub;
}