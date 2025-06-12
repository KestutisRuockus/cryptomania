import { useContext } from "react";
import { SavedCoinsContext } from "../context/SavedCoinsContext";

export const useSavedCoinsStatus = () => {
  const context = useContext(SavedCoinsContext);
  if (!context) {
    throw new Error(
      "useSavedCoinsStatus must be used within a SavedCoinsProvider"
    );
  }
  return context;
};
