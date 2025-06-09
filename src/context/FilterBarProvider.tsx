import { useState } from "react";
import type { ReactNode } from "react";

import { FilterBarContext } from "./FilterBarContext";

export const FilterBarProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return (
    <FilterBarContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        perPage,
        setPerPage,
      }}
    >
      {children}
    </FilterBarContext.Provider>
  );
};
