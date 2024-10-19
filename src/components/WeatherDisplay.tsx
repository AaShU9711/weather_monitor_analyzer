import React from 'react';
import { WeatherData, City } from '../types/WeatherTypes';
import { kelvinToCelsius } from '../services/WeatherService';
import { Cloud, Sun, CloudRain, Snowflake, Thermometer, Wind, Droplets } from 'lucide-react';

interface WeatherDisplayProps {
  city: City;
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, weatherData }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="weather-icon text-yellow-400 animate-float" />;
      case 'clouds':
        return <Cloud className="weather-icon text-gray-400 animate-float" />;
      case 'rain':
        return <CloudRain className="weather-icon text-blue-400 animate-float" />;
      case 'snow':
        return <Snowflake className="weather-icon text-blue-200 animate-float" />;
      default:
        return <Cloud className="weather-icon text-gray-400 animate-float" />;
    }
  };

  return (
    <div className="weather-card relative overflow-hidden">
      <div className="sun-background"></div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{city.name}</h2>
        {getWeatherIcon(weatherData.main)}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-semibold text-gray-900 flex items-center">
            <Thermometer className="mr-2 text-red-500" />
            {kelvinToCelsius(weatherData.temp).toFixed(1)}°C
          </p>
          <p className="text-sm text-gray-600 mt-1 flex items-center">
            <Wind className="mr-1" size={16} />
            Feels like: {kelvinToCelsius(weatherData.feels_like).toFixed(1)}°C
          </p>
          <p className="text-sm text-gray-600 mt-1 flex items-center">
            <Droplets className="mr-1" size={16} />
            Humidity: {weatherData.humidity}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-800">{weatherData.main}</p>
          <p className="text-xs text-gray-500 mt-1">
            Updated: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;