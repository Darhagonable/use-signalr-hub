# useSignalRHub
### Experimental
Easy to use React hook for signalR


## Getting started

Install using your preferred package manager:
```console
npm install use-signalr-hub
yarn add use-signalr-hub
```


## How to use

### Import into your project:
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
### configure defaults
```ts
signalR.setDefaults({
  httpConnectionOptions: {
    accessTokenFactory: () => user.userData.token
  },
  automaticReconnect: false
})
```

## Upcomming features
- `useSharedSignalRHub`