import useSignalRHub from "./useSignalRHub";
import { setDefaults } from "./globals";

const signalR = {
  useHub: useSignalRHub,
  setDefaults
};

export { default as useSignalRHub } from "./useSignalRHub";
export type { Options } from "./types";
export default signalR;