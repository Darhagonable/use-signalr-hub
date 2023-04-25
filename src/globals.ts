import { Options } from "./types";

const DEFAULTS: Options = {
  enabled: true,
  automaticReconnect: true
};

export let defaultOptions: Options = DEFAULTS;

export const setDefaults = (options: Options) => {
  defaultOptions = {
    ...DEFAULTS,
    ...options
  };
};