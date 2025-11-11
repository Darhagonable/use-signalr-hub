import { renderHook, waitFor } from "@testing-library/react";
import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
  afterEach
} from "vitest";
import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
  TransferFormat
} from "@microsoft/signalr";

import useSignalRHub from "./useSignalRHub";
import { Options } from "./types";

const { mockBuilder, mockConnection } = await vi.hoisted(async () => {
  const { HubConnectionBuilder } = await import("@microsoft/signalr");
  return {
    mockBuilder: vi.mockObject(new HubConnectionBuilder()),
    mockConnection: vi.mockObject(new HubConnectionBuilder().withUrl("http://example.com").build())
  };
});

vi.mock("@microsoft/signalr", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@microsoft/signalr")>();
  return {
    ...actual,
    HubConnectionBuilder: vi.fn(() => mockBuilder)
  };
});

describe("useSignalRHub", () => {
  const testUrl = "http://example.com";

  beforeEach(() => {
    vi.clearAllMocks();

    mockBuilder.withUrl.mockReturnThis();
    mockBuilder.withAutomaticReconnect.mockReturnThis();
    mockBuilder.configureLogging.mockReturnThis();
    mockBuilder.withHubProtocol.mockReturnThis();
    mockBuilder.build.mockReturnValue(mockConnection);

    mockConnection.start.mockResolvedValue(undefined);
    mockConnection.stop.mockResolvedValue(undefined);
    mockConnection.onclose.mockImplementation(vi.fn());
    mockConnection.onreconnecting.mockImplementation(vi.fn());
    mockConnection.onreconnected.mockImplementation(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not attempt to connect if options.enabled is false", () => {
    const options: Options = {
      enabled: false
    };

    const { result } = renderHook(() => useSignalRHub(testUrl, options));

    expect(result.current).toBeNull();
    expect(HubConnectionBuilder).not.toHaveBeenCalled();
    expect(mockConnection.start).not.toHaveBeenCalled();
  });

  it("should build the hub with the supplied URL and connect", async () => {
    const options: Options = {
      onConnected: vi.fn(),
      onError: vi.fn()
    };

    const { result } = renderHook(() => useSignalRHub(testUrl, options));

    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    expect(HubConnectionBuilder).toHaveBeenCalled();
    expect(mockBuilder.withUrl).toHaveBeenCalledWith(testUrl);
    expect(mockBuilder.build).toHaveBeenCalled();
    expect(mockConnection.start).toHaveBeenCalled();
    expect(result.current).toBe(mockConnection);
    expect(options.onConnected).toHaveBeenCalledWith(mockConnection);
    expect(options.onError).not.toHaveBeenCalled();
  });

  it("should call onError when the connection fails to start", async () => {
    const mockError = new Error("Connection failed");
    mockConnection.start.mockRejectedValue(mockError);

    const options: Options = {
      onConnected: vi.fn(),
      onError: vi.fn()
    };

    const { result } = renderHook(() => useSignalRHub(testUrl, options));

    await waitFor(() => {
      expect(options.onError).toHaveBeenCalledWith(mockError);
    });

    expect(result.current).toBeNull();
    expect(mockConnection.start).toHaveBeenCalled();
    expect(options.onConnected).not.toHaveBeenCalled();
  });

  it("should stop the connection on unmount if connected", async () => {
    Object.defineProperty(mockConnection, "state", { value: HubConnectionState.Connected });

    const { unmount } = renderHook(() => useSignalRHub(testUrl));

    await waitFor(() => {
      expect(mockConnection.start).toHaveBeenCalled();
    });

    unmount();

    expect(mockConnection.stop).toHaveBeenCalled();
  });

  it("should call withUrl with connectionOptions if provided", () => {
    const options: Options = {
      connectionOptions: {
        accessTokenFactory: () => "token"
      }
    };

    renderHook(() => useSignalRHub(testUrl, options));

    expect(mockBuilder.withUrl).toHaveBeenCalledWith(testUrl, options.connectionOptions);
  });

  it("should call withAutomaticReconnect (boolean) if provided", () => {
    const options: Options = {
      automaticReconnect: true
    };

    renderHook(() => useSignalRHub(testUrl, options));

    expect(mockBuilder.withAutomaticReconnect).toHaveBeenCalledWith();
  });

  it("should call withAutomaticReconnect (array) if provided", () => {
    const options: Options = {
      automaticReconnect: [0, 2000, 5000]
    };

    renderHook(() => useSignalRHub(testUrl, options));

    expect(mockBuilder.withAutomaticReconnect).toHaveBeenCalledWith(options.automaticReconnect);
  });

  it("should call withAutomaticReconnect (object) if provided", () => {
    const options: Options = {
      automaticReconnect: {
        nextRetryDelayInMilliseconds: (retryContext) => retryContext.elapsedMilliseconds
      }
    };

    renderHook(() => useSignalRHub(testUrl, options));

    expect(mockBuilder.withAutomaticReconnect).toHaveBeenCalledWith(options.automaticReconnect);
  });

  it("should call configureLogging if provided", () => {
    const options: Options = {
      logging: LogLevel.Debug
    };

    renderHook(() => useSignalRHub(testUrl, options));

    expect(mockBuilder.configureLogging).toHaveBeenCalledWith(options.logging);
  });

  it("should call withHubProtocol if provided", () => {
    const options: Options = {
      hubProtocol: {
        name: "",
        version: 0,
        transferFormat: TransferFormat.Text,
        parseMessages: () => [],
        writeMessage: () => ""
      }
    };

    renderHook(() => useSignalRHub(testUrl, options));

    expect(mockBuilder.withHubProtocol).toHaveBeenCalledWith(options.hubProtocol);
  });

  it("should register and call onReconnecting", async () => {
    const mockError = new Error("Reconnecting");
    mockConnection.onreconnecting.mockImplementation((callback) => callback(mockError));

    const options: Options = {
      onReconnecting: vi.fn()
    };

    renderHook(() => useSignalRHub(testUrl, options));

    await waitFor(() => {
      expect(mockConnection.start).toHaveBeenCalled();
    });

    expect(options.onReconnecting).toHaveBeenCalledWith(mockError);
  });

  it("should register and call onReconnected", async () => {
    const mockId = "new-connection-id";
    mockConnection.onreconnected.mockImplementation((callback) => callback(mockId));

    const options: Options = {
      onReconnected: vi.fn()
    };

    renderHook(() => useSignalRHub(testUrl, options));

    await waitFor(() => {
      expect(mockConnection.start).toHaveBeenCalled();
    });

    expect(options.onReconnected).toHaveBeenCalledWith(mockId);
  });

  it("should register and call onDisconnected", async () => {
    const mockError = new Error("Closed");
    mockConnection.onclose.mockImplementation((callback) => callback(mockError));

    const options: Options = {
      onDisconnected: vi.fn()
    };

    renderHook(() => useSignalRHub(testUrl, options));

    await waitFor(() => {
      expect(mockConnection.start).toHaveBeenCalled();
    });

    expect(options.onDisconnected).toHaveBeenCalledWith(mockError);
  });
});