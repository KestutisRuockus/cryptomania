import { useState } from "react";
import CryptoRow from "./CryptoRow";
import Pagination from "../../components/ui/Pagination";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useCoinsList from "../../hooks/useCoinsList";

const CryptoList = () => {
  const [currency] = useState<string>("€");

  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const { coinsList, loading, hasMore } = useCoinsList(page, perPage);

  return (
    <section
      aria-label="Cryptocurrency List"
      className={`flex flex-col ${loading ? "items-center" : "items-end"}`}
    >
      <h2 className="hidden">Cryptocurrency List</h2>
      <table className="table-auto w-full lg:w-4/5 m-auto mt-16">
        <thead className="border-2 border-slate-600">
          <tr className={`text-lg text-[var(--color-text-primary)]`}>
            <th className="py-1">Asset</th>
            <th className="hidden min-[500px]:table-cell">Name</th>
            <th>Price</th>
            <th className="hidden sm:table-cell">Total Volume</th>
            <th className="hidden lg:table-cell uppercase">1H</th>
            <th className="hidden lg:table-cell uppercase">24H</th>
            <th className="hidden lg:table-cell uppercase">7D</th>
          </tr>
        </thead>
        <tbody className="border-2 border-slate-600">
          {!loading &&
            coinsList.map((item, index) => (
              <CryptoRow
                key={item.id}
                item={item}
                index={index}
                currency={currency}
              />
            ))}
        </tbody>
      </table>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Pagination page={page} setPage={setPage} hasMore={hasMore} />
      )}
    </section>
  );
};

export default CryptoList;
