import React from 'react';
import { DailySummary } from '../types/WeatherTypes';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DailySummaryProps {
  summaries: DailySummary[];
}

const DailySummaryChart: React.FC<DailySummaryProps> = ({ summaries }) => {
  const chartData = {
    labels: summaries.map(summary => summary.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: summaries.map(summary => summary.avgTemp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true
      },
      {
        label: 'Max Temperature',
        data: summaries.map(summary => summary.maxTemp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        fill: true
      },
      {
        label: 'Min Temperature',
        data: summaries.map(summary => summary.minTemp),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.1,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Weather Summary',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  const getWeatherConditionImage = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80';
      case 'clouds':
        return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80';
      case 'rain':
        return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80';
      case 'snow':
        return 'https://images.unsplash.com/photo-1516431883744-f077382a500e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80';
      default:
        return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80';
    }
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Daily Weather Summary</h2>
      <div className="chart-container mb-8">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Dominant Weather Conditions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {summaries.map((summary, index) => (
            <div key={index} className="bg-gray-100 rounded-md p-3 flex items-center">
              <img
                src={getWeatherConditionImage(summary.dominantCondition)}
                alt={summary.dominantCondition}
                className="weather-condition-icon mr-3"
              />
              <div>
                <p className="font-medium text-gray-800">{summary.date}</p>
                <p className="text-sm text-gray-600">{summary.dominantCondition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailySummaryChart;