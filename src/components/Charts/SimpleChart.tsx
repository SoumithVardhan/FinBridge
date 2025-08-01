import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: ChartData[];
  type: 'line' | 'bar' | 'pie';
  title?: string;
  height?: number;
  showTrend?: boolean;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ 
  data, 
  type, 
  title, 
  height = 200,
  showTrend = false 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="100%" height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (item.value / maxValue) * 80;
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill="#3b82f6"
              className="drop-shadow-sm hover:r-6 transition-all cursor-pointer"
            />
          );
        })}
      </svg>
    );
  };

  const renderBarChart = () => {
    return (
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 80;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  height: `${barHeight}%`,
                  backgroundColor: item.color || colors[index % colors.length],
                  minHeight: '4px'
                }}
              />
              <span className="text-xs text-gray-600 mt-2 text-center truncate w-full">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center justify-center">
        <svg width={height} height={height} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            cumulativePercentage += percentage;

            return (
              <circle
                key={index}
                cx="50%"
                cy="50%"
                r="40%"
                fill="transparent"
                stroke={item.color || colors[index % colors.length]}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="hover:stroke-width-24 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
    );
  };

  const calculateTrend = () => {
    if (data.length < 2) return null;
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    const change = ((lastValue - firstValue) / firstValue) * 100;
    return change;
  };

  const trend = showTrend ? calculateTrend() : null;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {trend !== null && (
            <div className={`flex items-center text-sm font-medium ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>
      )}
      
      <div style={{ height }}>
        {type === 'line' && renderLineChart()}
        {type === 'bar' && renderBarChart()}
        {type === 'pie' && renderPieChart()}
      </div>

      {type === 'pie' && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color || colors[index % colors.length] }}
              />
              <span className="text-gray-600 truncate">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleChart;