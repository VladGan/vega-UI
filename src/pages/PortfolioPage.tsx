// src/pages/PortfolioPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonutChart from '../components/DonutChart';
import PositionsTable from '../components/PositionsTable';
import HistoricalChart from '../components/HistoricalChart';
import ErrorBoundary from '../components/ErrorBoundary';
import {getAssets, getPortfolio} from '../api/assetsApi.ts';
import { logout } from '../utils/auth';
import {Asset, Portfolio} from '../api/apiInterface.ts'
import ErrorPage from "./ErrorPage.tsx";

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState<Portfolio>();
  const [assetsData, setAssetsData] = useState<Asset[]>();

  const [viewBy, setViewBy] = useState<'asset' | 'assetClass'>('asset');
  // const [timePeriod, setTimePeriod] = useState('1Y'); // Example time periods: '1M', '6M', '1Y'
  // todo add readme about timeline
  const [error, setError] = useState<{title: string, native: any}>();


  // Fetch portfolio data on component mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolio = await getPortfolio();
        const assets = await getAssets();
        setPortfolioData(portfolio);
        setAssetsData(assets);
      } catch (err: any) {
        setError({
          title: 'Failed to load data',
          native: err
        });
      }
    };
    fetchPortfolio();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewChange = (newView: 'asset' | 'assetClass') => {
    setViewBy(newView);
  };

  if (error) {
    return <ErrorPage
      statusCode={error.native.status}
      title={error.title}
      message={error.native.message}
    />
  }

  return (
    <ErrorBoundary>
      <div className="w-full p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={() => handleViewChange('asset')}
              className={`mr-2 py-2 px-4 rounded ${viewBy === 'asset' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              View by Asset
            </button>
            <button
              onClick={() => handleViewChange('assetClass')}
              className={`py-2 px-4 rounded ${viewBy === 'assetClass' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              View by Asset Class
            </button>
          </div>

          {/*<select*/}
          {/*  value={timePeriod}*/}
          {/*  onChange={(e) => handleTimePeriodChange(e.target.value)}*/}
          {/*  className="py-2 px-4 border border-gray-300 rounded"*/}
          {/*>*/}
          {/*  <option value="1M">1 Month</option>*/}
          {/*  <option value="6M">6 Months</option>*/}
          {/*  <option value="1Y">1 Year</option>*/}
          {/*  <option value="5Y">5 Years</option>*/}
          {/*</select>*/}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Portfolio Balance</h2>
            {
              assetsData && portfolioData &&
              <DonutChart
                viewBy={viewBy}
                assetsData={assetsData}
                portfolioData={portfolioData}/>
            }
          </div>

          {/* Positions Table */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Positions</h2>
            {
              assetsData && portfolioData &&
              <PositionsTable
                assetsData={assetsData}
                portfolioData={portfolioData}
              />
            }
          </div>
        </div>

        {/* Historical Chart */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Historical Performance</h2>
          {/*<HistoricalChart timePeriod={timePeriod}/>*/}
          <HistoricalChart/>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PortfolioPage;
