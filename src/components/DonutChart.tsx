// src/components/DonutChart.tsx

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getAssets, getPortfolio } from '../api/assetsApi.ts';

interface DonutChartProps {
  viewBy: 'asset' | 'assetClass'; // Determines if we're viewing by individual asset or by asset class
}

interface AssetData {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#E74C3C', '#3498DB'];

const DonutChart: React.FC<DonutChartProps> = ({ viewBy }) => {
  const [chartData, setChartData] = useState<AssetData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assets = await getAssets();
        const portfolio = await getPortfolio();

        const dataByAsset = portfolio.positions.map((position: any, index: number) => ({
          name: assets.find((asset: any) => asset.id === position.asset)?.name || `Asset ${index + 1}`,
          value: position.quantity * position.price, // Assuming API provides quantity and price per asset
          color: COLORS[index % COLORS.length]
        }));
        console.log("dataByAsset - ", dataByAsset)
        console.log("assets - ", assets)
        console.log("portfolio - ", portfolio)


        const dataByAssetClass = Object.values(
          dataByAsset.reduce((acc: any, asset: AssetData) => {
            const assetClass = assets.find((a: any) => a.name === asset.name)?.type || 'Other';
            acc[assetClass] = acc[assetClass] || { name: assetClass, value: 0, color: asset.color };
            acc[assetClass].value += asset.value;
            return acc;
          }, {})
        );

        setChartData(viewBy === 'asset' ? dataByAsset : dataByAssetClass as AssetData[]);
      } catch (err) {
        setError('Failed to load chart data');
      }
    };

    fetchData();
  }, [viewBy]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
