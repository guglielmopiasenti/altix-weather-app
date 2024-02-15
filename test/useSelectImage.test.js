import { describe, test, expect } from "vitest";
import useSelectImage from "@/composables/useSelectImage";

describe("useSelectImage", () => {
  test("returns correct image URL", () => {
    const { selectImage } = useSelectImage();
    const imageUrl = selectImage("cloudy", "cloudy.png");
    expect(imageUrl).toBe("public/weather/cloudy.png");
  });
});
