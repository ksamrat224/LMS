import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/themeContext.tsx";
import { BookProvider } from "./context/bookContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BookProvider>
          <App />
        </BookProvider>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
