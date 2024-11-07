// src/components/HistoricalChart.tsx

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getPortfolio } from '../api/assetsApi.ts';
import { Portfolio } from "../api/apiInterface.ts";
import ErrorPage from "../pages/ErrorPage.tsx";

interface HistoricalChartProps {
  // timePeriod: string; // e.g., '1M', '6M', '1Y', '5Y'
}

const HistoricalChart: React.FC<HistoricalChartProps> = () => {
  const [historicalData, setHistoricalData] = useState<{date:string, value: number}[]>([]);
  const [chartBoundaries, setChartBoundaries] = useState<{min:number, max: number}>();
  const [error, setError] = useState<{title: string, native: any}>();

  const convertDateToShort = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${day}.${month}`;
  }

  // Helper function to calculate the date range based on the selected time period
  const getDateRange = () => {
    const endDate = new Date();
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    return { from: startDate.toISOString().split('T')[0], to: endDate.toISOString().split('T')[0] };
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const { from, to }: {from: string, to: string} = getDateRange();
      try {
        let currentDate = from;
        const portfolios = [];
        do {
          const portfolio = await getPortfolio(currentDate);
          portfolios.push(portfolio);
          let date = new Date(currentDate);
          date.setDate( date.getDate() + 1);
          currentDate = date.toISOString().split('T')[0]
        } while (currentDate !== to)

        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        const processedData = portfolios
          .map((portfolio: Portfolio) => {
            let value = 0;
            portfolio.positions.forEach(position => value+=position.price * position.quantity);
            min = Math.min(value, min);
            max = Math.max(value, max);
            return {
              date: convertDateToShort(portfolio.asOf),
              value: value
            }
        });

        min = min * 0.9; min -= min % 1000;
        max = max * 1.1; max += (1000 - max % 1000);

        setChartBoundaries({min, max})
        setHistoricalData(processedData);
      } catch (err) {
        setError({
          title: 'Failed to load data',
          native: err
        });
      }
    };
    fetchHistoricalData();
  }, []);

  if (error) {
    return <ErrorPage
      statusCode={error.native.status}
      title={error.title}
      message={error.native.message}
    />
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={historicalData}
                   margin={{ top: 10, right: 30, left: 0, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"
                 tick={{
                   angle: -90,
                   textAnchor: 'end',
                   dominantBaseline: 'middle',
                   dx: -10,
                   fontSize: 12
                 }}
                 padding={{ left: 30, right: 30 }}
                 label={{
                   value: 'Date',
                   position: 'insideMiddle',
                   dy: 60,
                   style: { textAnchor: 'middle', fontSize: 14 }
                 }}
          />
          <YAxis
            dataKey="price"
            domain={[chartBoundaries?.min || 0, chartBoundaries?.max || 1000]}
            label={{
              value: 'Total Value ($)',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 14 }
            }}
            padding={{ top: 30, bottom: 30 }}
            tick={{
              fontSize: 12
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
