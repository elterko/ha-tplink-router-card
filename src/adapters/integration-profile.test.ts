import { describe, expect, it } from "vitest";
import { getAllowedColumnsForDomain, OMADA_EXTRA_COLUMN_KEYS } from "./integration-profile";

describe("getAllowedColumnsForDomain", () => {
  it("grants the same Omada columns to omada_open_api as to omada/tplink_omada", () => {
    const omada = getAllowedColumnsForDomain("omada");
    const tplinkOmada = getAllowedColumnsForDomain("tplink_omada");
    const omadaOpenApi = getAllowedColumnsForDomain("omada_open_api");

    expect(omadaOpenApi).toEqual(omada);
    expect(omadaOpenApi).toEqual(tplinkOmada);
    for (const key of OMADA_EXTRA_COLUMN_KEYS) {
      expect(omadaOpenApi).toContain(key);
    }
  });
});
