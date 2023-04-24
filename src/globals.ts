import { Options } from "types";

const DEFAULTS: Options = {
  enabled: true,
  automaticReconnect: true
};

export let defaultOptions: Options;

export const setDefaults = (options: Options) => {
  defaultOptions = {
    ...DEFAULTS,
    ...options,
    httpConnectionOptions: {
      ...DEFAULTS.httpConnectionOptions,
      ...options.httpConnectionOptions
    }
  };
};