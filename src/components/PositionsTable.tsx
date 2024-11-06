// src/components/PositionsTable.tsx
import { useEffect, useState } from 'react';
import { Asset, Portfolio } from '../api/apiInterface.ts'

interface PositionTableProps {
  assetsData: Asset[];
  portfolioData: Portfolio;
}

const PositionsTable : React.FC<PositionTableProps> = ({ assetsData, portfolioData }) => {
  const [processedData, setProcessedData] = useState<any>([]);

  useEffect(() => {
    const fetchPositions = async () => {
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
      setProcessedData(processedData);
    };
    fetchPositions();
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
      <tr>
        <th className="py-2 text-left">Asset</th>
        <th className="py-2 text-left">Type</th>
        <th className="py-2 text-left">Value</th>
      </tr>
      </thead>
      <tbody>
      {processedData.map((entry: any) => {
        return (<tr key={entry.name}>
          <td className="py-2">{entry.name}</td>
          <td className="py-2">{entry.type}</td>
          <td className="py-2">{entry.value}</td>
        </tr>)
      })}
      </tbody>
    </table>
  );
};

export default PositionsTable;
