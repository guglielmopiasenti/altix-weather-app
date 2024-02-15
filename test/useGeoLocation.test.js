import { describe, test, expect, vi } from "vitest";
import useGeolocation from "@/composables/useGeolocation";

vi.mock("vue", () => ({
  ref: vi.fn().mockImplementation((init) => ({ value: init })),
}));

describe("useGeolocation", () => {
  test("initial state", () => {
    const { coords, city } = useGeolocation();
    expect(coords.value).toEqual({ latitude: null, longitude: null });
    expect(city.value).toBe(null);
  });

  
});
