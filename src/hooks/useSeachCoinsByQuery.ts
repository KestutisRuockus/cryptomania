import axios from "axios";
import { useEffect, useState } from "react";
import type { CoinListItem } from "../features/types";

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
  const limitOfItemsperSearch = 10;

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

      try {
        const searchresults = await axios.get(
          "https://api.coingecko.com/api/v3/search",
          {
            params: {
              query: searchQuery,
            },
          }
        );
        const topCoins = searchresults.data.coins.slice(
          0,
          limitOfItemsperSearch
        );

        if (topCoins.length === 0) {
          setCoinsListBySearchQuery([]);
          setNoSearchResults(true);
          setIsSearching(false);
          return;
        }
        const ids = topCoins.map((coin: SearchResultCoin) => coin.id).join(",");

        const marketResults = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              ids,
              order: "market_cap_desc",
              sparkline: false,
              price_change_percentage: "1h,24h,7d",
            },
          }
        );

        setCoinsListBySearchQuery(marketResults.data);
      } catch (error) {
        setSearchError("Failed to fetch coins. " + error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchCoins();
  }, [searchQuery]);

  return { coinsListBySearchQuery, isSearching, searchError, noSearchResults };
};

export default useSearchCoinsbyQuery;
