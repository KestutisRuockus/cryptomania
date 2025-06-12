import { useState, useEffect } from "react";
import { SavedCoinsContext } from "./SavedCoinsContext";

export const SavedCoinsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedCoinsIds, setSavedCoinsIds] = useState<string[]>([]);
  const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

  useEffect(() => {
    const storedIds = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedIds) {
      try {
        setSavedCoinsIds(JSON.parse(storedIds));
      } catch {
        setSavedCoinsIds([]);
      }
    }
  }, [LOCAL_STORAGE_KEY]);

  const toggleSavedStatus = (id: string) => {
    setSavedCoinsIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((coinId) => coinId !== id)
        : [...prev, id];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isSavedCoinId = (id: string) => savedCoinsIds.includes(id);

  return (
    <SavedCoinsContext.Provider
      value={{ savedCoinsIds, isSavedCoinId, toggleSavedStatus }}
    >
      {children}
    </SavedCoinsContext.Provider>
  );
};
