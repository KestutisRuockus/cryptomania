import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import { FilterBarProvider } from "./context/FilterBarProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <FilterBarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FilterBarProvider>
    </ThemeProvider>
  </StrictMode>
);
