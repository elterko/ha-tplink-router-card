import { describe, expect, it } from "vitest";
import { matchAction } from "./action-matcher";

describe("action matcher", () => {
  it("matches tp-link wifi switches", () => {
    expect(matchAction("switch", "switch.tp_link_router_wifi_5g", "WIFI 5G")).toEqual({
      kind: "host",
      band: "5g",
      requiresHold: true,
    });
    expect(
      matchAction("switch", "switch.tp_link_router_wifi_guest_24g", "Guest WIFI 2.4G"),
    ).toEqual({
      kind: "guest",
      band: "2g",
      requiresHold: true,
    });
    expect(matchAction("switch", "switch.tp_link_router_iot_6g", "IoT WIFI 6G")).toEqual({
      kind: "iot",
      band: "6g",
      requiresHold: true,
    });
  });

  it("matches reboot/restart buttons only", () => {
    expect(matchAction("button", "button.tp_link_router_reboot", "Reboot")).toEqual({
      kind: "router",
      requiresHold: true,
    });
    expect(
      matchAction("button", "button.omada_reconnect", "Reconnect", "omada"),
    ).toEqual({
      kind: "router",
      requiresHold: true,
    });
    expect(
      matchAction(
        "button",
        "button.omada_ai_optimization",
        "Start WLAN Optimization",
        "omada",
      ),
    ).toEqual({
      kind: "router",
      requiresHold: true,
    });
    expect(
      matchAction("button", "button.omada_reconnect", "Reconnect"),
    ).toBeNull();
    expect(
      matchAction("button", "button.omada_ai_optimization", "Start WLAN Optimization"),
    ).toBeNull();
  });

  it("recognizes the omada_open_api integration domain (ha-omada-open-api)", () => {
    expect(
      matchAction(
        "button",
        "button.client_reconnect",
        "Reconnect",
        "omada_open_api",
      ),
    ).toEqual({
      kind: "router",
      requiresHold: true,
    });
    expect(
      matchAction(
        "button",
        "button.wlan_optimization",
        "WLAN Optimization",
        "omada_open_api",
      ),
    ).toEqual({
      kind: "router",
      requiresHold: true,
    });
  });

  it("handles scanning switch and ignores unsupported switches", () => {
    expect(
      matchAction("switch", "switch.tp_link_router_scanning", "Router data fetching"),
    ).toEqual({
      kind: "router",
      requiresHold: false,
    });
    expect(matchAction("switch", "switch.omada_block", "Block")).toBeNull();
    expect(matchAction("switch", "switch.omada_ssid_main", "Main WLAN")).toBeNull();
  });
});
