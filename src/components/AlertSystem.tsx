import React, { useState } from 'react';
import { AlertConfig } from '../types/WeatherTypes';
import { AlertTriangle, Bell } from 'lucide-react';

interface AlertSystemProps {
  onAlertConfigChange: (config: AlertConfig) => void;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ onAlertConfigChange }) => {
  const [alertType, setAlertType] = useState<'temperature' | 'condition'>('temperature');
  const [threshold, setThreshold] = useState<number>(35);
  const [condition, setCondition] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config: AlertConfig = {
      type: alertType,
      threshold: threshold,
      condition: alertType === 'condition' ? condition : undefined
    };
    onAlertConfigChange(config);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Bell className="mr-2 text-yellow-500 alert-icon" />
        Alert Configuration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
          <select
            value={alertType}
            onChange={(e) => setAlertType(e.target.value as 'temperature' | 'condition')}
            className="input"
          >
            <option value="temperature">Temperature</option>
            <option value="condition">Weather Condition</option>
          </select>
        </div>
        {alertType === 'temperature' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperature Threshold (°C)</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="input"
            />
          </div>
        )}
        {alertType === 'condition' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weather Condition</label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="input"
              placeholder="e.g., Rain, Snow, Clear"
            />
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center"
        >
          <AlertTriangle className="mr-2" size={18} />
          Set Alert
        </button>
      </form>
    </div>
  );
};

export default AlertSystem;