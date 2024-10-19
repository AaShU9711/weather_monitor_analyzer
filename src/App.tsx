import React, { useState, useEffect } from 'react';
import { WeatherData, City, DailySummary, AlertConfig } from './types/WeatherTypes';
import { INDIAN_METROS } from './config/cities';
import { fetchWeatherData, kelvinToCelsius } from './services/WeatherService';
import WeatherDisplay from './components/WeatherDisplay';
import DailySummaryChart from './components/DailySummary';
import AlertSystem from './components/AlertSystem';
import { format } from 'date-fns';
import { MapPin, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<Map<number, WeatherData>>(new Map());
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({ type: 'temperature', threshold: 35 });
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newWeatherData = new Map<number, WeatherData>();
      for (const city of INDIAN_METROS) {
        try {
          const data = await fetchWeatherData(city);
          newWeatherData.set(city.id, data);
        } catch (error) {
          console.error(`Failed to fetch weather data for ${city.name}:`, error);
        }
      }
      setWeatherData(newWeatherData);
      updateDailySummary(newWeatherData);
      checkAlerts(newWeatherData);
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const updateDailySummary = (data: Map<number, WeatherData>) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const temperatures = Array.from(data.values()).map(d => kelvinToCelsius(d.temp));
    const conditions = Array.from(data.values()).map(d => d.main);

    const newSummary: DailySummary = {
      date: today,
      avgTemp: temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length,
      maxTemp: Math.max(...temperatures),
      minTemp: Math.min(...temperatures),
      dominantCondition: getDominantCondition(conditions)
    };

    setDailySummaries(prev => [...prev.slice(-6), newSummary]);
  };

  const getDominantCondition = (conditions: string[]): string => {
    const counts = conditions.reduce((acc, condition) => {
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const checkAlerts = (data: Map<number, WeatherData>) => {
    const newAlerts: string[] = [];

    data.forEach((weatherData, cityId) => {
      const city = INDIAN_METROS.find(c => c.id === cityId);
      if (!city) return;

      const temp = kelvinToCelsius(weatherData.temp);

      if (alertConfig.type === 'temperature' && temp > alertConfig.threshold) {
        newAlerts.push(`Alert: Temperature in ${city.name} (${temp.toFixed(1)}°C) exceeds threshold of ${alertConfig.threshold}°C`);
      } else if (alertConfig.type === 'condition' && weatherData.main.toLowerCase() === alertConfig.condition?.toLowerCase()) {
        newAlerts.push(`Alert: ${alertConfig.condition} condition detected in ${city.name}`);
      }
    });

    if (newAlerts.length > 0) {
      setAlerts(prev => [...prev, ...newAlerts]);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 px-8 rounded-lg shadow-md mb-8 bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <MapPin className="mr-2 animate-pulse" size={32} />
          Weather Monitoring System
        </h1>
        <p className="text-blue-100">Real-time weather data for major Indian metros</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDIAN_METROS.map(city => (
          weatherData.has(city.id) && (
            <WeatherDisplay key={city.id} city={city} weatherData={weatherData.get(city.id)!} />
          )
        ))}
      </div>
      <div className="mt-12">
        <DailySummaryChart summaries={dailySummaries} />
      </div>
      <div className="mt-12">
        <AlertSystem onAlertConfigChange={setAlertConfig} />
      </div>
      {alerts.length > 0 && (
        <div className="mt-12 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md bg-opacity-80 backdrop-filter backdrop-blur-lg" role="alert">
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <AlertTriangle className="mr-2 text-red-500 alert-icon" size={24} />
            Weather Alerts
          </h3>
          <ul className="list-disc list-inside">
            {alerts.map((alert, index) => (
              <li key={index} className="animate-pulse">{alert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;