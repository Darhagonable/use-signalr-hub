import useSignalRHub from "useSignalRHook";
import { setDefaults } from "globals";

const signalR = {
  useSignalRHub,
  setDefaults
};

export { default as useSignalRHub } from "useSignalRHook";
export type { Options } from "types";
export default signalR;