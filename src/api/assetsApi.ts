// src/api/assetsApi.ts
import axios from 'axios';
import {Portfolio, VegaAPI} from "./apiInterface.ts";

export const getAssets = async (): Promise<VegaAPI["assets"]>  => {
  try {
    const response = await axios.get('http://localhost:3000/assets');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching assets');
  }
};

// src/api/pricesApi.ts
export const getPrices = async (assets: string[], {
  asOf, from, to
}: { asOf?: string, from?: string, to?: string }): Promise<VegaAPI["prices"]> => {
  try {
    const response = await axios.get('http://localhost:3000/prices', {
      params: { assets: assets.join(','), asOf, from, to },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching prices');
  }
};

// src/api/portfolioApi.ts
export const getPortfolio = async (asOf?: string): Promise<Portfolio> => {
  try {
    const response = await axios.get('http://localhost:3000/portfolios', { params: { asOf } });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching portfolio');
  }
};
