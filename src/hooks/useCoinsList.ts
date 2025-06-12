import axios from "axios";
import { useContext, useEffect, useState } from "react";
import type { CoinListItem } from "../features/types";
import { FilterBarContext } from "../context/FilterBarContext";

const useCoinsList = () => {
  const [coinsList, setCoinsList] = useState<CoinListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { page, perPage, currency } = filterContext;

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      const url = import.meta.env.VITE_BASE_URL;

      try {
        const result = await axios.get<CoinListItem[]>(`${url}/coins/markets`, {
          params: {
            vs_currency: currency,
            order: "market_desc_cap",
            per_page: perPage,
            page: page,
            sparkline: false,
            price_change_percentage: "1h,24h,7d",
          },
        });
        setHasMore(result.data.length === perPage);
        setCoinsList(result.data);
      } catch (error) {
        setError("Failed to fetch coins. " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [page, perPage, currency]);

  return { coinsList, loading, error, hasMore };
};

export default useCoinsList;
