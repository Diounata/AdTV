import {
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail,
} from "lucide-react";
import { useGetCurrentWeatherQuery } from "../../hooks/react-query/use-get-current-weather-query";
import { Loading } from "@/components/ui/loading";

type WeatherInfo = {
  icon: React.ReactNode;
  description: string;
};

const weatherMap: Record<number, WeatherInfo> = {
  0: { icon: <Sun size={60} color="#15803D" />, description: "Céu limpo" },
  1: { icon: <CloudSun size={60} color="#15803D" />, description: "Principalmente limpo" },
  2: { icon: <CloudSun size={60} color="#15803D" />, description: "Parcialmente nublado" },
  3: { icon: <Cloud size={60} color="#15803D" />, description: "Encoberto" },
  45: { icon: <CloudFog size={60} color="#15803D" />, description: "Névoa" },
  48: { icon: <CloudFog size={60} color="#15803D" />, description: "Névoa com gelo" },
  51: { icon: <CloudDrizzle size={60} color="#15803D" />, description: "Garoa leve" },
  53: { icon: <CloudDrizzle size={60} color="#15803D" />, description: "Garoa moderada" },
  55: { icon: <CloudDrizzle size={60} color="#15803D" />, description: "Garoa intensa" },
  56: { icon: <CloudDrizzle size={60} color="#15803D" />, description: "Garoa congelante leve" },
  57: { icon: <CloudDrizzle size={60} color="#15803D" />, description: "Garoa congelante intensa" },
  61: { icon: <CloudRain size={60} color="#15803D" />, description: "Chuva leve" },
  63: { icon: <CloudRain size={60} color="#15803D" />, description: "Chuva moderada" },
  65: { icon: <CloudRain size={60} color="#15803D" />, description: "Chuva intensa" },
  66: { icon: <CloudRain size={60} color="#15803D" />, description: "Chuva congelante leve" },
  67: { icon: <CloudRain size={60} color="#15803D" />, description: "Chuva congelante intensa" },
  71: { icon: <CloudSnow size={60} color="#15803D" />, description: "Neve leve" },
  73: { icon: <CloudSnow size={60} color="#15803D" />, description: "Neve moderada" },
  75: { icon: <CloudSnow size={60} color="#15803D" />, description: "Neve intensa" },
  77: { icon: <CloudSnow size={60} color="#15803D" />, description: "Grãos de neve" },
  80: { icon: <CloudRain size={60} color="#15803D" />, description: "Pancada de chuva leve" },
  81: { icon: <CloudRain size={60} color="#15803D" />, description: "Pancada de chuva moderada" },
  82: { icon: <CloudRain size={60} color="#15803D" />, description: "Pancada de chuva violenta" },
  85: { icon: <CloudSnow size={60} color="#15803D" />, description: "Pancada de neve leve" },
  86: { icon: <CloudSnow size={60} color="#15803D" />, description: "Pancada de neve intensa" },
  95: { icon: <CloudLightning size={60} color="#15803D" />, description: "Trovoada" },
  96: { icon: <CloudHail size={60} color="#15803D" />, description: "Trovoada com granizo leve" },
  99: { icon: <CloudHail size={60} color="#15803D" />, description: "Trovoada com granizo intenso" },
};
export function WeatherDisplay() {
  const { data: weatherData } = useGetCurrentWeatherQuery();

  if (!weatherData) {
    return <Loading label="Carregando..."/>
  }

  const { current_weather } = weatherData;

  const weatherCode = current_weather.weathercode;
  const weather = weatherMap[weatherCode] || {
    icon: <Cloud size={60} color="#15803D" />,
    description: current_weather.weathercode.toString(),
  };

  return (
    <section className="flex h-full items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
      {weather.icon}
      <div className="flex flex-col">
        <span className="text-3xl font-medium">{current_weather.temperature.toString().replace(".", ",")}º C</span>
        <span className="text-lg text-gray-500">{weather.description}</span>
      </div>
    </section>
  );
}
