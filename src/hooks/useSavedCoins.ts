import { useEffect, useState } from "react";

export const useSavedCoins = () => {
  const [savedCoinsIds, setSavedCoinsIds] = useState<string[]>([]);
  const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE_KEY;

  useEffect(() => {
    const storedIds = localStorage.getItem(localStorageKey);
    if (storedIds) {
      try {
        setSavedCoinsIds(JSON.parse(storedIds));
      } catch (error) {
        console.error("Failed to parse starred IDs from localStorage:", error);
      }
    }
  }, [localStorageKey]);

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
