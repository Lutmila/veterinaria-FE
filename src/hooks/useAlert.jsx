import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider');
  }
  return context;
};