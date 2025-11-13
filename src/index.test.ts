import { describe, it, expect } from "vitest";
import signalR, { useSignalRHub } from "./index";
import { setDefaults } from "./globals";

describe("exports", () => {
  it("should export useHub via default export", () => {
    expect(signalR.useHub).toBe(useSignalRHub);
  });

  it("should export setDefaults via default export", () => {
    expect(signalR.setDefaults).toBe(setDefaults);
  });

  it("should export useSignalRHub", () => {
    expect(typeof useSignalRHub).toBe("function");
  });
});