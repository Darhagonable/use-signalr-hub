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
  const optionsRef = useRef<Options>({...defaultOptions, ...options});

  useEffect(() => {
    optionsRef.current = {...defaultOptions, ...options};
  }, [options]);

  useEffect(() => {
    if(!optionsRef.current.enabled)
      return;

    let isCanceled = false;

    const hubConnectionSetup = new HubConnectionBuilder();

    if(optionsRef.current.httpTransportTypeOrOptions)
      // @ts-expect-error: We don't need to adhere to the overloads. https://github.com/microsoft/TypeScript/issues/14107
      hubConnectionSetup.withUrl(hubUrl, optionsRef.current.httpTransportTypeOrOptions);
    else
      hubConnectionSetup.withUrl(hubUrl);

    if(optionsRef.current.automaticReconnect) {
      if(optionsRef.current.automaticReconnect === true)
        hubConnectionSetup.withAutomaticReconnect();
      else
        // @ts-expect-error: We don't need to adhere to the overloads. https://github.com/microsoft/TypeScript/issues/14107
        hubConnectionSetup.withAutomaticReconnect(optionsRef.current.automaticReconnect);
    }

    if(optionsRef.current.logging)
      hubConnectionSetup.configureLogging(optionsRef.current.logging);

    if(optionsRef.current.hubProtocol)
      hubConnectionSetup.withHubProtocol(optionsRef.current.hubProtocol);

    const hubConnection = hubConnectionSetup.build();

    hubConnection.start()
      .then(() => {
        if(isCanceled)
          return hubConnection.stop();

        if(optionsRef.current.onConnected)
          optionsRef.current.onConnected(hubConnection);

        if(optionsRef.current.onDisconnected)
          hubConnection.onclose(optionsRef.current.onDisconnected);

        if(optionsRef.current.onReconnecting)
          hubConnection.onreconnecting(optionsRef.current.onReconnecting);

        if(optionsRef.current.onReconnected)
          hubConnection.onreconnected(optionsRef.current.onReconnected);

        setSignalRHub(hubConnection);
      })
      .catch((error) => {
        if(isCanceled)
          return;

        if(optionsRef.current.onError)
          optionsRef.current.onError(error);
      });

    return () => {
      isCanceled = true;

      if(hubConnection.state === HubConnectionState.Connected)
        hubConnection.stop();

      setSignalRHub(null);
    };
  }, [hubUrl, optionsRef.current.enabled]);

  return signalRHub;
}