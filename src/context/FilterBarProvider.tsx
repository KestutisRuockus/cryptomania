import { useState } from "react";
import type { ReactNode } from "react";
import { FilterBarContext } from "./FilterBarContext";
import type { CurrencyCode } from "../features/types";

export const FilterBarProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [currency, setCurrency] = useState<CurrencyCode>("eur");

  return (
    <FilterBarContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        perPage,
        setPerPage,
        currency,
        setCurrency,
      }}
    >
      {children}
    </FilterBarContext.Provider>
  );
};
