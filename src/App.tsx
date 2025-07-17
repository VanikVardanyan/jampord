import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { AppRoutes } from "./AppRoutes/AppRoutes";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { theme } from "./theme/theme";

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={<CircularProgress />}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <AppRoutes />
            </ThemeProvider>
          </Provider>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
