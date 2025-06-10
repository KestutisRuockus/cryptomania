import { useContext } from "react";
import { FilterBarContext } from "../../context/FilterBarContext";
import { popularCurrencies } from "../../data/currenciesList";
import type { CurrencyCode } from "../../features/types";

const CurrencySelector = () => {
  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { currency, setCurrency } = filterContext;
  return (
    <div className="min-w-3xs flex justify-end items-center gap-1 border-2 border-[var(--color-bg-primary)] rounded-lg py-0.5 px-0.5">
      <p className="text-[var(--color-text-primary)] font-semibold">
        Currency:
      </p>
      <select
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        value={currency}
        className="bg-[var(--color-bg-primary)] py-1 px-2 rounded-lg cursor-pointer hover:opacity-60 transition-opacity duration-300 outline-none text-[var(--color-text-primary)] font-semibold"
      >
        {popularCurrencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
