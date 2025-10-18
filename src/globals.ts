import deepmerge from "deepmerge";
import { Options } from "./types";

const DEFAULTS: Options = {
  enabled: true
};

export let defaultOptions: Options = DEFAULTS;

export const setDefaults = (options: Options) => {
  defaultOptions = deepmerge(DEFAULTS, options);
};