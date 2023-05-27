[![NPM Version](https://badge.fury.io/js/use-signalr-hub.svg)](https://npmjs.org/package/use-signalr-hub)

# useSignalRHub
An easy to use React hook for [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr)

Please use Microsoft's [Documentation](https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client) and [API Reference](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr) as guidance.

## Getting started

### Install using your preferred package manager
```console
$ npm install use-signalr-hub
$ yarn add use-signalr-hub
```

### Import into your project
```tsx
import signalR, { useSignalRHub } from "use-signalr-hub"
```
### Use in your React component
```tsx
const signalRHub = useSignalRHub("/chathub", {
  onConnected: (hub) => {
    console.log("Connected to /chathub", hub)
    hub.on("ReceiveMessage", (user, message) => {
      setMessage({user, message})
    })
  },
  onDisconnected: () => {
    console.log("Disconnected from /chathub")
  },
  onError: (error) => {
    console.log("Connection to /chathub failed with error", error)
  }
})

const handleSubmit = (message, user) => {
  signalRHub.invoke("SendMessage", user, message)
    .catch((error) => {
      console.log("Failed to invoke SendMessage on /chathub", error)
    })
}
```
### Configure defaults
```ts
signalR.setDefaults({
  httpTransportTypeOrOptions: {
    accessTokenFactory: () => user.userData.token
  },
  automaticReconnect: false
})
```

## Api
```ts
const signalRHub = useSignalRHub(hubUrl, {
  onConnected,
  onDisconnected,
  onReconnecting,
  onReconnected,
  onError,
  enabled,
  automaticReconnect,
  httpTransportTypeOrOptions,
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
httpTransportTypeOrOptions?: IHttpConnectionOptions | HttpTransportType
hubProtocol?: IHubProtocol
logging?: LogLevel | string | ILogger
```
[HubConnection](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/hubconnection)
|
[IRetryPolicy](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/iretrypolicy)
|
[IHttpConnectionOptions](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/ihttpconnectionoptions)
|
[HttpTransportType](https://learn.microsoft.com/en-us/javascript/api/@microsoft/signalr/httptransporttype)
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