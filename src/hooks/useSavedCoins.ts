import { useContext, useEffect, useState } from "react";
import { FilterBarContext } from "../context/FilterBarContext";

export const useSavedCoins = () => {
  const [savedCoinsIds, setSavedCoinsIds] = useState<string[]>([]);
  const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE_KEY;

  const filterContext = useContext(FilterBarContext);
  if (!filterContext) {
    throw new Error(
      "useFilterBarContext must be used within FilterBarProvider"
    );
  }
  const { currency } = filterContext;

  useEffect(() => {
    const storedIds = localStorage.getItem(localStorageKey);
    if (storedIds) {
      try {
        setSavedCoinsIds(JSON.parse(storedIds));
      } catch (error) {
        console.error("Failed to parse starred IDs from localStorage:", error);
      }
    }
  }, [localStorageKey, currency]);

  const isSavedCoinId = (id: string) => savedCoinsIds.includes(id);

  const toggleSavedStatus = (id: string) => {
    const filtered = isSavedCoinId(id)
      ? savedCoinsIds.filter((coinId) => coinId !== id)
      : [...savedCoinsIds, id];

    setSavedCoinsIds(filtered);
    localStorage.setItem(localStorageKey, JSON.stringify(filtered));
  };

  return { savedCoinsIds, toggleSavedStatus, isSavedCoinId };
};
