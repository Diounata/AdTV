import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GetCurrentWeatherResponseData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
}

export function useGetCurrentWeatherQuery() {
  return useQuery({
    queryKey: ["get-current-weather"],
    queryFn: async () => {
      const response = await axios.get<GetCurrentWeatherResponseData>(
        "https://api.open-meteo.com/v1/forecast?latitude=-20.896476119395054&longitude=-51.376909189746954&current_weather=true",
      );
      return response.data;
    },
    refetchInterval: 60 * 60 * 1000, // 1 hour in milliseconds
  });
}
