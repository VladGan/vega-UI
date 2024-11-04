import { Asset, Price, Position, Portfolio, VegaAPI } from './apiInterface.ts'
const mockAssets: Asset[] = [
  {
    id: "1f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    name: "AAPL",
    type: "stock",
  },
  {
    id: "2f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    name: "BTC",
    type: "crypto",
  },
  {
    id: "3f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    name: "USD",
    type: "fiat",
  }
];

const mockPrices: Price[] = [
  {
    id: "4f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    asset: "AAPL",
    price: 290,
  },
  {
    id: "5f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    asset: "BTC",
    price: 40250,
  },
  {
    id: "6f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    asset: "USD",
    price: 1,
  }
];

const mockPositions: Position[] = [
  {
    id: 10,
    asset: "1f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    quantity: 50,
    asOf: "2023-11-01T10:00:00Z",
    price: 300
  },
  {
    id: 11,
    asset: "2f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    quantity: 1,
    asOf: "2023-11-01T10:00:00Z",
    price: 40500
  },
  {
    id: 12,
    asset: "3f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    quantity: 1000,
    asOf: "2023-11-01T10:00:00Z",
    price: 1
  }
];

const mockPortfolios: Portfolio[] = [
  {
    id: "7f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    asOf: "2023-11-01T10:00:00Z",
    positions: mockPositions,
  },
  {
    id: "8f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
    asOf: "2023-11-01T10:00:00Z",
    positions: [
      {
        id: 13,
        asset: "1f33b3a8-d3a9-40d2-aad5-9937b1cdd0e9",
        quantity: 10,
        asOf: "2023-11-01T10:00:00Z",
        price: 305
      }
    ],
  }
];

const mockVegaAPI: VegaAPI = {
  assets: mockAssets,
  prices: mockPrices,
  portfolios: mockPortfolios,
};

export { mockAssets, mockPrices, mockPositions, mockPortfolios, mockVegaAPI };
