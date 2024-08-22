import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ErrorContext from "./utils/errorContext";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/home/page";
import LoginPage from "./pages/login/page";
import Error404 from "./pages/404/page";
import Error500 from "./pages/500/page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

const App = () => {
  const error = useState<boolean>(false);

  return (
    <div>
      <BrowserRouter>
        <ErrorContext.Provider value={error}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <div className="pt-14" style={{ minHeight: "100vh" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/500" element={<Error500 />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
            <Footer />
          </QueryClientProvider>
        </ErrorContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
