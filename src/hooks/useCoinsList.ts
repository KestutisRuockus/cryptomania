import axios from "axios";
import { useEffect, useState } from "react";
import type { CoinListItem } from "../features/types";

const useCoinsList = (page: number, perPage: number) => {
  const [coinsList, setCoinsList] = useState<CoinListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await axios.get<CoinListItem[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_desc_cap",
              per_page: perPage,
              page: page,
              sparkline: false,
              price_change_percentage: "1h,24h,7d",
            },
          }
        );
        setHasMore(result.data.length === perPage);
        setCoinsList(result.data);
      } catch (error) {
        setError("Failed to fetch coins. " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [page, perPage]);

  return { coinsList, loading, error, hasMore };
};

export default useCoinsList;
