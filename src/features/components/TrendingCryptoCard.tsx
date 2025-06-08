import { useLocation, useNavigate } from "react-router-dom";
import type { TrendingCoin } from "../types";

const TrendingCryptoCard = ({ coin }: { coin: TrendingCoin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = (id: string) => {
    navigate(`/trending/modal/${id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div
      onClick={() => openModal(coin.id)}
      className="w-full flex flex-col gap-2 bg-[var(--color-bg-primary)] p-6 rounded-lg relative cursor-pointer"
    >
      <div className="flex max-[360px]:flex-col gap-1 items-start">
        <h2 className="text-[var(--color-text-primary)]">Name:</h2>
        <div className="flex gap-1">
          <span className="text-[var(--color-text-secondary)] font-bold">
            {coin.name}
          </span>
          <img
            className="w-4 block min-[360px]:hidden"
            src={coin.thumb}
            alt={coin.name}
          />
        </div>
      </div>
      <div className="flex gap-1 items-start">
        <p className="text-[var(--color-text-primary)]">Market Cap Rank:</p>
        <span className="text-[var(--color-text-secondary)] font-bold">
          {coin.market_cap_rank}
        </span>
      </div>
      <div className="flex max-[400px]:flex-col gap-1 items-start">
        <p className="text-[var(--color-text-primary)]">Price (In Btc):</p>
        <span className="text-[var(--color-text-secondary)] font-bold">
          {coin.price_btc}
        </span>
      </div>
      <div className="flex gap-1 items-start">
        <p className="text-[var(--color-text-primary)]">Score:</p>
        <span className="text-[var(--color-text-secondary)] font-bold">
          {coin.score + 1}
        </span>
      </div>
      <img
        src={coin.thumb}
        alt={coin.name}
        className="max-[360px]:hidden absolute right-1 top-1 w-16"
      />
    </div>
  );
};

export default TrendingCryptoCard;
