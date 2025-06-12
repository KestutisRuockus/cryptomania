import axios from "axios";
import { useContext, useEffect, useState } from "react";
import type { CoinListItem } from "../features/types";
import { FilterBarContext } from "../context/FilterBarContext";

type SearchResultCoin = {
  id: string;
  name: string;
  symbol: string;
  api_symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

const useSearchCoinsbyQuery = (searchQuery: string) => {
  const [coinsListBySearchQuery, setCoinsListBySearchQuery] = useState<
    CoinListItem[]
  >([]);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [noSearchResults, setNoSearchResults] = useState<boolean>(false);

  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { currency } = filterContext;

  useEffect(() => {
    const fetchCoins = async () => {
      if (!searchQuery.trim()) {
        setCoinsListBySearchQuery([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      setSearchError(null);
      setNoSearchResults(false);
      const url = import.meta.env.VITE_BASE_URL;

      try {
        const searchresults = await axios.get(`${url}/search`, {
          params: {
            query: searchQuery,
          },
        });
        if (searchresults.data.coins === 0) {
          setCoinsListBySearchQuery([]);
          setNoSearchResults(true);
          setIsSearching(false);
          return;
        }
        const ids = searchresults.data.coins
          .map((coin: SearchResultCoin) => coin.id)
          .join(",");

        const marketResults = await axios.get(`${url}/coins/markets`, {
          params: {
            vs_currency: currency,
            ids,
            order: "market_cap_desc",
            sparkline: false,
            price_change_percentage: "1h,24h,7d",
          },
        });

        setCoinsListBySearchQuery(marketResults.data);
      } catch (error) {
        setSearchError("Failed to fetch coins. " + error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchCoins();
  }, [searchQuery, currency]);

  return { coinsListBySearchQuery, isSearching, searchError, noSearchResults };
};

export default useSearchCoinsbyQuery;
