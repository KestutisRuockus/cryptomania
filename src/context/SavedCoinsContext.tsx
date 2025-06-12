import { createContext } from "react";

export type SavedCoinsContextType = {
  savedCoinsIds: string[];
  isSavedCoinId: (id: string) => boolean;
  toggleSavedStatus: (id: string) => void;
};

export const SavedCoinsContext = createContext<
  SavedCoinsContextType | undefined
>(undefined);
