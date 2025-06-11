import { useContext } from "react";
import CryptoRow from "./CryptoRow";
import Pagination from "../../components/ui/Pagination";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useCoinsList from "../../hooks/useCoinsList";
import { FilterBarContext } from "../../context/FilterBarContext";
import useSearchCoinsbyQuery from "../../hooks/useSeachCoinsByQuery";
import { popularCurrencies } from "../../data/currenciesList";
import { useSavedCoins } from "../../hooks/useSavedCoins";

const CryptoList = () => {
  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { page, setPage, searchQuery, currency } = filterContext;
  const { coinsList, loading, hasMore } = useCoinsList();
  const { coinsListBySearchQuery, isSearching, noSearchResults } =
    useSearchCoinsbyQuery(searchQuery);
  const currencySymbol =
    popularCurrencies.find((item) => item.code === currency)?.symbol ?? "";
  const { isSavedCoinId, toggleSavedStatus } = useSavedCoins();

  const isSearchingActive = searchQuery.trim().length > 0;
  const finalList = isSearchingActive ? coinsListBySearchQuery : coinsList;

  return (
    <section
      aria-label="Cryptocurrency List"
      className={`flex flex-col ${
        loading || isSearching ? "items-center" : "items-end"
      } mt-12 mb-6`}
    >
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
          {!loading && noSearchResults && (
            <tr>
              <td
                colSpan={7}
                className="text-center py-4 text-lg text-gray-400"
              >
                No results found for "{searchQuery}"
              </td>
            </tr>
          )}
          {!loading &&
            !isSearching &&
            finalList.map((item, index) => (
              <CryptoRow
                key={item.id}
                item={item}
                index={index}
                currency={currencySymbol}
                isSavedCoinId={isSavedCoinId}
                toggleSavedStatus={toggleSavedStatus}
              />
            ))}
        </tbody>
      </table>
      {isSearching && <LoadingSpinner />}
      {loading && <LoadingSpinner />}
      <div className="w-full flex justify-between gap-6 mt-6 items-center">
        <p className="text-[var(--color-text-primary)] border-2 border-[var(--color-bg-primary)] bg-[var(--color-bg-secondary)] rounded-lg py-0.5 px-1.5">
          Data Provided By{" "}
          <a
            href="https://www.coingecko.com/"
            target="_blank"
            style={{ fontSize: "var(--text-body-lg)" }}
            className="text-[var(--color-text-secondary)] font-semibold"
          >
            CoinGecko
          </a>
        </p>
        {!loading && !searchQuery && (
          <Pagination page={page} setPage={setPage} hasMore={hasMore} />
        )}
      </div>
    </section>
  );
};

export default CryptoList;
