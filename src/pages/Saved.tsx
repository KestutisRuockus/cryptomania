import { useContext, useEffect, useState } from "react";
import { useSavedCoins } from "../hooks/useSavedCoins";
import type { CoinListItem } from "../features/types";
import axios from "axios";
import { FilterBarContext } from "../context/FilterBarContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import CryptoRow from "../features/components/CryptoRow";
import { popularCurrencies } from "../data/currenciesList";

const Saved = () => {
  const { savedCoinsIds } = useSavedCoins();
  const [savedList, setSavedList] = useState<CoinListItem[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { currency } = filterContext;

  const currencySymbol =
    popularCurrencies.find((item) => item.code === currency)?.symbol ?? "";
  const { isSavedCoinId, toggleSavedStatus } = useSavedCoins();

  const handleUnsave = (id: string) => {
    toggleSavedStatus(id);
    setSavedList((prev) => prev.filter((coin) => coin.id !== id));
  };

  useEffect(() => {
    const fetchSavedlistByIds = async () => {
      if (savedCoinsIds.length === 0) {
        return;
      }
      setLoading(true);
      const url = import.meta.env.VITE_BASE_URL;

      try {
        const ids = savedCoinsIds.join(",");
        const results = await axios.get(`${url}/coins/markets`, {
          params: {
            vs_currency: currency,
            ids,
            order: "market_cap_desc",
            sparkline: false,
            price_change_percentage: "1h,24h,7d",
          },
        });

        setSavedList(results.data);
      } catch (error) {
        console.log("Error fetching saved Ids coins. ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedlistByIds();
  }, [currency, savedCoinsIds]);

  return (
    <section className="w-full flex justify-center">
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <h2 className="hidden">Cryptocurrency List</h2>
          <table className="table-auto w-full m-auto">
            <thead className="border-2 border-slate-600">
              <tr className={`text-lg text-[var(--color-text-primary)]`}>
                <th className="py-1">Asset</th>
                <th className="hidden min-[500px]:table-cell">Name</th>
                <th>Price</th>
                <th className="hidden xl:table-cell">Total Volume</th>
                <th className="hidden xl:table-cell uppercase">1H</th>
                <th className="hidden lg:table-cell uppercase">24H</th>
                <th className="hidden md:table-cell uppercase">7D</th>
              </tr>
            </thead>
            <tbody className="border-2 border-slate-600">
              {savedList.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-4 text-lg text-gray-400"
                  >
                    No Saved Coins
                  </td>
                </tr>
              )}
              {savedList.map((item, index) => (
                <CryptoRow
                  key={item.id}
                  item={item}
                  index={index}
                  currency={currencySymbol}
                  isSavedCoinId={isSavedCoinId}
                  toggleSavedStatus={handleUnsave}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default Saved;
