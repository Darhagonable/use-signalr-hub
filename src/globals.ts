import { Options, OOptions, TOptions } from "./types";

const DEFAULTS: Options = {
  enabled: true
};

export let defaultOptions: Options = DEFAULTS;

export function setDefaults(options: OOptions): void
export function setDefaults(options: TOptions): void
export function setDefaults(options: Options) {
  defaultOptions = {
    ...DEFAULTS,
    ...options
  };
}