[![NPM Version](https://badge.fury.io/js/use-signalr-hub.svg)](https://npmjs.org/package/use-signalr-hub)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/Darhagonable/use-signalr-hub/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue)](https://makeapullrequest.com)
[![GitHub Repo stars](https://img.shields.io/github/stars/Darhagonable/use-signalr-hub?style=social)](https://github.com/Darhagonable/use-signalr-hub/stargazers)

# useSignalRHub
An easy to use React hook for [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr)

Please use Microsoft's [Documentation](https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client) and [API Reference](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr) as guidance.

## Getting started

### Install using your preferred package manager
```console
$ npm install use-signalr-hub @microsoft/signalr
$ yarn add use-signalr-hub @microsoft/signalr
```

### Import into your project
```ts
import signalR from "use-signalr-hub"
```
### Use in your React component
```ts
const signalRHub = signalR.useHub("https://www.example.com/hub", {
  onConnected: (hub) => {
    // Connected to hub
    hub.on("ReceiveMessage", (user, message) => {
      // Listen to "ReceiveMessage" on hub
    })
  },
  onDisconnected: (error) => {
    // Disconnected from hub
  },
  onError: (error) => {
    // Failed to connect to hub
  }
})

const handleSubmit = (user, message) => {
  signalRHub.invoke("SendMessage", user, message)
    .catch((error) => {
      // Failed to invoke "SendMessage" on hub
    })
}
```
### Configure defaults
```ts
signalR.setDefaults({
  connectionOptions: {
    accessTokenFactory: () => user.userData.token
  },
  automaticReconnect: false
})
```

## Api
```ts
const signalRHub = signalR.useHub(hubUrl, {
  onConnected,
  onDisconnected,
  onReconnecting,
  onReconnected,
  onError,
  enabled,
  automaticReconnect,
  connectionOptions,
  hubProtocol,
  logging
})
```

### Options
```ts 
onConnected?: (hub: HubConnection) => void
onDisconnected?: (error?: Error) => void
onReconnecting?: (error?: Error) => void
onReconnected?: (connectionId?: string) => void
onError?: (error?: Error) => void
enabled?: boolean
automaticReconnect?: number[] | IRetryPolicy | boolean
connectionOptions?: IHttpConnectionOptions
hubProtocol?: IHubProtocol
logging?: LogLevel | string | ILogger
```
[HubConnection](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/hubconnection)
|
[IRetryPolicy](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/iretrypolicy)
|
[IHttpConnectionOptions](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/ihttpconnectionoptions)
|
[IHubProtocol](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/ihubprotocol)
|
[LogLevel](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/loglevel)
|
[ILogger](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/ilogger)

### Returns
```ts
signalRHub: HubConnection | null
```
[HubConnection](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/hubconnection)