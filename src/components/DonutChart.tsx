// src/components/DonutChart.tsx

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {Asset, Portfolio} from "../api/apiInterface.ts";

interface DonutChartProps {
  viewBy: 'asset' | 'assetClass'; // Determines if we're viewing by individual asset or by asset class
  assetsData: Asset[];
  portfolioData: Portfolio;
}

interface AssetData {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#E74C3C', '#3498DB'];

const DonutChart: React.FC<DonutChartProps> = ({ viewBy, assetsData, portfolioData }) => {
  const [chartData, setChartData] = useState<AssetData[]>([]);

  useEffect(() => {
    const fetchPositions = () => {
      const processedData: any = [];
      assetsData.forEach(asset => {
        const processedDataEntry = {
          type: asset.type,
          name: asset.name,
          value: 0
        };
        processedData.push(processedDataEntry);
      })

      portfolioData.positions.forEach(position => {
        const assetID = position.asset;
        let name = assetsData.find(asset => asset.id === assetID)?.name;
        processedData.find((entry: any) => entry.name === name).value += position.quantity * position.price;
      })

      const dataByAsset = processedData.map((entry: any, index: number) => ({
        name: entry.name || `Asset ${index + 1}`,
        value: entry.value, // Assuming API provides quantity and price per asset
        color: COLORS[index % COLORS.length]
      }));

      const dataByAssetClass = Object.values(
        dataByAsset.reduce((acc: any, asset: AssetData) => {
          const assetClass = assetsData.find((a: any) => a.name === asset.name)?.type || 'Other';
          acc[assetClass] = acc[assetClass] || { name: assetClass, value: 0, color: asset.color };
          acc[assetClass].value += asset.value;
          return acc;
        }, {})
      );

      setChartData(viewBy === 'asset' ? dataByAsset : dataByAssetClass as AssetData[]);
    };
    fetchPositions();
  }, [viewBy, assetsData, portfolioData]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          animationBegin={0}
          animationDuration={500}
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
