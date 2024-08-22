import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import ErrorContext from "./utils/errorContext";
import Header from "./components/header";
import Footer from "./components/footer";
import CheckPermissions from "./utils/permissions";
import PageLoader from "./components/pageloader";

const HomePage = lazy(() => import("./pages/home/page"));
const LoginPage = lazy(() => import("./pages/login/page"));
const Error404 = lazy(() => import("./pages/404/page"));
const Error500 = lazy(() => import("./pages/500/page"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const AboutPage = lazy(() => import("./pages/about/page"));
const RegisterPage = lazy(() => import("./pages/register/page"));

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
            <CheckPermissions />
            <Header />
            <div
              className="pt-14 mx-auto lg:max-w-1300"
              style={{
                minHeight: "calc(100vh - 2.8rem)",
              }}
            >
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/500" element={<Error500 />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </Suspense>
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
