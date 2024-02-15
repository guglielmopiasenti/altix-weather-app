import { describe, test, expect } from "vitest";
import useSelectBackgroundColor from "@/composables/useSelectBackgroundColor";

describe("useSelectBackgroundColor", () => {
  test("returns correct background class", () => {
    const { selectBackgroundColor } = useSelectBackgroundColor();
    const className = selectBackgroundColor("cloudy");
    expect(className).toBe("expected-class-for-cloudy");
  });
});
