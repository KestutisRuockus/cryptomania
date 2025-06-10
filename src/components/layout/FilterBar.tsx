import { useLocation } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import CurrencySelector from "../ui/CurrencySelector";

const FilterBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <aside
      aria-label="Search and currency settings"
      className={`w-full sm:w-3/5 m-auto flex flex-col lg:flex-row ${
        isHomePage
          ? "items-start sm:items-start sm:justify-between gap-2"
          : "items-end sm:justify-end"
      } items-center p-3 my-6 bg-[var(--color-bg-secondary)] rounded-lg`}
    >
      {isHomePage && <SearchBar />}
      <CurrencySelector />
    </aside>
  );
};

export default FilterBar;
