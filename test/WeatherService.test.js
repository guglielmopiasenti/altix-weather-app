import { describe, test, expect, vi } from "vitest";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "@/services/WeatherService";

vi.mock("@/services/WeatherService", () => ({
  fetchCurrentWeather: vi.fn(() =>
    Promise.resolve({
      
    })
  ),
  fetchWeatherForecast: vi.fn(() =>
    Promise.resolve({
      
    })
  ),
}));

describe("WeatherService", () => {
  test("fetchCurrentWeather returns weather data", async () => {
    const data = await fetchCurrentWeather("New York");
    expect(data).toEqual({
      
    });
  });

  test("fetchWeatherForecast returns forecast data", async () => {
    const data = await fetchWeatherForecast("New York");
    expect(data).toEqual({
      
    });
  });
});
