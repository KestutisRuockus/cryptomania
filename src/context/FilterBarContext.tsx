import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { CurrencyCode } from "../features/types";

export type FilterBarContextType = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: (perPage: number) => void;
  currency: CurrencyCode;
  setCurrency: Dispatch<SetStateAction<CurrencyCode>>;
};

export const FilterBarContext = createContext<FilterBarContextType | undefined>(
  undefined
);

export const useFilterBarContext = () => {
  const context = useContext(FilterBarContext);
  if (!context) {
    throw new Error(
      "useFilterBarContext must be used within a FilterBarProvider"
    );
  }
  return context;
};
