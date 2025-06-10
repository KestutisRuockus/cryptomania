import { useEffect, useState } from "react";
import type { TrendingCoin } from "../features/types";
import axios from "axios";

const useTrendinigCoinsList = () => {
  const [trendingList, setTrendingList] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending",
          {
            params: {
              order: "market_desc_cap",
            },
          }
        );
        const extracted = result.data.coins.map(
          (entry: { item: TrendingCoin }) => entry.item
        );
        setTrendingList(extracted);
      } catch (error) {
        console.log("Failed to fetch Trending list " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingCoins();
  }, []);

  return { trendingList, loading, error };
};

export default useTrendinigCoinsList;
