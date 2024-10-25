import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { ErrorContext, ShowErrorContext } from "./utils/errorContext";
import Header from "./components/header";
import Footer from "./components/footer";
import CheckPermissions from "./utils/permissions";
import PageLoader from "./components/pageloader";
import ScrollToTop from "./utils/scrolltotop";
import ProductsSearchPage from "./pages/products_search/page";

const HomePage = lazy(() => import("./pages/home/page"));
const LoginPage = lazy(() => import("./pages/login/page"));
const Error404 = lazy(() => import("./pages/404/page"));
const Error500 = lazy(() => import("./pages/500/page"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const AboutPage = lazy(() => import("./pages/about/page"));
const RegisterPage = lazy(() => import("./pages/register/page"));
const LogoutPage = lazy(() => import("./pages/logout/page"));
const FeePage = lazy(() => import("./pages/fee/page"));
const PrivacyPage = lazy(() => import("./pages/privacy/page"));
const FAQPage = lazy(() => import("./pages/faq/page"));
const TermsPage = lazy(() => import("./pages/terms/page"));
const ProductsPage = lazy(() => import("./pages/products/page"));
const CustomersPage = lazy(() => import("./pages/customers/page"));
const CustomersSearchPage = lazy(() => import("./pages/customer_search/page"));
const IndividualProductPage = lazy(() => import("./pages/product/page"));
const EditProductPage = lazy(() => import("./pages/editproduct/page"));
const DeleteProductPage = lazy(() => import("./pages/deleteproduct/page"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

const App = () => {
  const error = useState<boolean>(false);
  const err = useState<string | null>(null);

  return (
    <div>
      <BrowserRouter>
        <ErrorContext.Provider value={error}>
          <ShowErrorContext.Provider value={err}>
            <QueryClientProvider client={queryClient}>
              <CheckPermissions />
              <ScrollToTop />
              <Header />
              <div
                className="pt-14 mx-auto lg:max-w-1300"
                style={{
                  minHeight: "100vh",
                }}
              >
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/fees" element={<FeePage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route
                      path="/products/:id"
                      element={<IndividualProductPage />}
                    />
                    <Route
                      path="/products/:id/edit"
                      element={<EditProductPage />}
                    />
                    <Route
                      path="/products/:id/delete"
                      element={<DeleteProductPage />}
                    />
                    <Route
                      path="/products/search/:_query"
                      element={<ProductsSearchPage />}
                    />
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route
                      path="/customers/search/:_query"
                      element={<CustomersSearchPage />}
                    />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/500" element={<Error500 />} />
                    <Route path="*" element={<Error404 />} />
                  </Routes>
                </Suspense>
              </div>
              <Footer />
            </QueryClientProvider>
          </ShowErrorContext.Provider>
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
