import { useEffect, useState } from "react";
import type { CoinItemInModal } from "../features/types";
import axios from "axios";

const useCoinbyId = (id: string) => {
  const [coinData, setCoinData] = useState<CoinItemInModal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCoinById = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await axios.get<CoinItemInModal>(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            params: {
              vs_currency: "usd",
              sparkline: false,
              price_change_percentage: "1h,24h,7d",
            },
          }
        );
        setCoinData(result.data);
      } catch (error) {
        setError(`Failed to fetch coin by ID ( ${id} ). ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinById();
  }, [id]);

  return { coinData, loading, error };
};

export default useCoinbyId;
