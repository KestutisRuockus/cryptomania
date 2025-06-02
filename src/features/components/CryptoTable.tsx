import { useState } from "react";
import CryptoRow from "./CryptoRow";
const list = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 27384,
    market_cap: 514000000000,
    market_cap_rank: 1,
    total_volume: 35000000000,
    price_change_percentage_1h_in_currency: 0.21,
    price_change_percentage_24h: 1.95,
    price_change_percentage_7d_in_currency: 0.95,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 1865.23,
    market_cap: 223000000000,
    market_cap_rank: 2,
    total_volume: 11000000000,
    circulating_supply: 120000000,
    price_change_percentage_1h_in_currency: -0.12,
    price_change_percentage_24h: -0.01,
    price_change_percentage_7d_in_currency: -0.48,
  },
];

const CryptoList = () => {
  const [currency] = useState<string>("€");
  return (
    <section aria-label="Cryptocurrency List">
      <h2 className="hidden">Cryptocurrency List</h2>
      <table className="table-auto w-full lg:w-4/5 m-auto my-16">
        <thead className="border-2 border-slate-600">
          <tr className={`text-lg text-[var(--color-text-primary)]`}>
            <th className="py-1">Asset</th>
            <th className="hidden min-[500px]:table-cell">Name</th>
            <th>Price</th>
            <th className="hidden sm:table-cell">Total Volume</th>
            <th className="hidden lg:table-cell uppercase">1H</th>
            <th className="hidden lg:table-cell uppercase">24H</th>
            <th className="hidden lg:table-cell uppercase">7D</th>
          </tr>
        </thead>
        <tbody className="border-2 border-slate-600">
          {list.map((item, index) => (
            <CryptoRow
              key={item.id}
              item={item}
              index={index}
              currency={currency}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CryptoList;
