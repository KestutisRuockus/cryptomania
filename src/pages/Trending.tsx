import LoadingSpinner from "../components/ui/LoadingSpinner";
import TrendingCryptoCard from "../features/components/TrendingCryptoCard";
import useTrendinigCoinsList from "../hooks/useTrendingCoinsList";

const Trending = () => {
  const { trendingList, loading } = useTrendinigCoinsList();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-4 gap-x-16 py-6 px-12 max-[500px]:px-4 bg-[var(--color-bg-secondary)]">
      {loading && <LoadingSpinner />}
      {!loading &&
        trendingList.map((item) => (
          <TrendingCryptoCard key={item.id} coin={item} />
        ))}
    </section>
  );
};

export default Trending;
