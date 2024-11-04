// src/components/HistoricalChart.tsx

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import {getAssets, getPrices} from '../api/assetsApi.ts';

interface HistoricalChartProps {
  timePeriod: string; // e.g., '1M', '6M', '1Y', '5Y'
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ timePeriod }) => {
  const [historicalData, setHistoricalData] = useState<{date:string, value: number}[]>([]);
  const [error, setError] = useState('');

  // Helper function to calculate the date range based on the selected time period
  const getDateRange = () => {
    const endDate = new Date();
    let startDate = new Date();

    switch (timePeriod) {
      case '1M':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case '6M':
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case '1Y':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case '5Y':
        startDate.setFullYear(startDate.getFullYear() - 5);
        break;
      default:
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    return { from: startDate.toISOString().split('T')[0], to: endDate.toISOString().split('T')[0] };
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const { from, to }: {from: string, to: string} = getDateRange();
      console.log("fetchHistoricalData from to", from, to)

      const assets = await getAssets();

      try {
        const prices = await getPrices(assets.map(asset => asset.name), {from, to});
        console.log("assets prices", assets, prices)

        // const data = await getPortfolio(from); // Pass the date range to the API
        // Assuming the API returns a list of portfolio values over time
        const processedData = prices.map((entry: { asset: string; price: number, date: string }) => ({
          date: entry.date,
          value: entry.price,
        }));
        setHistoricalData(processedData);
        console.log("processedData", processedData)
      } catch (err) {
        setError('Failed to load historical data');
      }
    };

    fetchHistoricalData();
  }, [timePeriod]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historicalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
