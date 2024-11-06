export interface VegaAPI {
  assets: Asset[];
  prices: Price[];
  portfolios: Portfolio[];
}

export interface Portfolio {
  id: string; // UUID
  asOf: string; // Date-Time string
  positions: Position[];
}

export interface Position {
  id: number; // int64
  asset: string; // UUID
  quantity: number; // int32
  asOf: string; // Date-Time string
  price: number; // int32
}

export interface Price {
  id: string; // UUID
  asset: string;
  price: number; // int32
  timestamp: number; // Date-Time string //todo describe in readme
}

export interface Asset {
  id: string; // UUID
  name: string;
  type: "stock" | "crypto" | "fiat";
}
