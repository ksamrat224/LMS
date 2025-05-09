import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/themeContext.tsx";
import { BookProvider } from "./context/bookContext.tsx";
import { MemberProvider } from "./context/memberContext.tsx";
import {Provider} from "react-redux"
import store from "./Redux/Store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BookProvider>
          <MemberProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </MemberProvider>
        </BookProvider>
      </ThemeProvider>
      <ToastContainer autoClose={1000} pauseOnHover={true} />
    </BrowserRouter>
  </StrictMode>
);
