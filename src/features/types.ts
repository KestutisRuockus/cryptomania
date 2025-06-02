type CryptoRowItemProps = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
};
export type CryptoRowProps = {
  item: CryptoRowItemProps;
  index: number;
  currency: string;
};
