import type { popularCurrencies } from "../data/currenciesList";

type CryptoRowItemProps = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency?: number;
};
export type CryptoRowProps = {
  item: CryptoRowItemProps;
  index: number;
  currency: string;
  isSavedCoinId: (id: string) => boolean;
  toggleSavedStatus: (id: string) => void;
};

export type CoinListItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency?: number;
};

type CurrencyMap = {
  [currencyCode: string]: number;
};

export type CoinItemInModal = CoinListItem & {
  market_data: {
    current_price: CurrencyMap;
    low_24h: CurrencyMap;
    high_24h: CurrencyMap;
    market_cap: CurrencyMap;
    total_volume: CurrencyMap;
    max_supply: string;
    circulating_supply: number;
  };
  links: {
    homepage: string[];
    official_forum_url: string[];
  };
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  image: {
    small: string;
  };
};

export type TrendingCoin = {
  id: string;
  name: string;
  market_cap_rank: number;
  price_btc: number;
  thumb: string;
  score: number;
};

export type CurrencyCode = (typeof popularCurrencies)[number]["code"];
