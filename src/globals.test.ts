import { describe, it, expect, beforeEach } from "vitest";
import { setDefaults, defaultOptions } from "./globals";

describe("setDefaults", () => {
  beforeEach(() => {
    setDefaults({
      enabled: true
    });
  });

  it("should have default options initially", () => {
    expect(defaultOptions).toEqual({
      enabled: true
    });
  });

  it("should merge new options with defaults", () => {
    const accessTokenFactory = () => "token";

    setDefaults({
      connectionOptions: {
        accessTokenFactory
      },
      automaticReconnect: true
    });

    expect(defaultOptions).toEqual({
      connectionOptions: {
        accessTokenFactory
      },
      automaticReconnect: true,
      enabled: true
    });
  });
});
