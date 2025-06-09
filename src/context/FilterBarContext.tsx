import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type FilterBarContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: (perPage: number) => void;
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
