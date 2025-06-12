import { useContext, useEffect, useState } from "react";
import type { CoinItemInModal } from "../features/types";
import axios from "axios";
import { FilterBarContext } from "../context/FilterBarContext";

const useCoinbyId = (id: string) => {
  const [coinData, setCoinData] = useState<CoinItemInModal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { currency } = filterContext;

  useEffect(() => {
    if (!id) return;
    const fetchCoinById = async () => {
      setLoading(true);
      setError(null);
      const url = import.meta.env.VITE_BASE_URL;

      try {
        const result = await axios.get<CoinItemInModal>(`${url}/coins/${id}`, {
          params: {
            vs_currency: currency,
            sparkline: false,
            price_change_percentage: "1h,24h,7d",
          },
        });
        setCoinData(result.data);
      } catch (error) {
        setError(`Failed to fetch coin by ID ( ${id} ). ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinById();
  }, [id, currency]);

  return { coinData, loading, error };
};

export default useCoinbyId;
