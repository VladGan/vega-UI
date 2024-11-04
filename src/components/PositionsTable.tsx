// src/components/PositionsTable.tsx
import { useEffect, useState } from 'react';
import { getPortfolio } from '../api/assetsApi.ts';
import { Position } from '../api/apiInterface.ts'

const PositionsTable = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const portfolio = await getPortfolio();
      console.log("portfolio.positions", portfolio)
      setPositions(portfolio.positions); // Assuming `positions` is part of API response
    };
    fetchPositions();
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
      <tr>
        <th className="py-2">Asset</th>
        <th className="py-2">Quantity</th>
        <th className="py-2">Value</th>
      </tr>
      </thead>
      <tbody>
      {positions.map((position) => (
        <tr key={position.id}>
          <td className="py-2">{position.asset}</td>
          <td className="py-2">{position.quantity}</td>
          <td className="py-2">{position.price}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default PositionsTable;
