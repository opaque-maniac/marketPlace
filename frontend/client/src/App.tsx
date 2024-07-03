import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import Header from "./components/header";
import LoginPage from "./pages/login/login";
import VerifyAuth from "./utils/verifyAuth";
import ScrollToTop from "./utils/scrollToTop";
import Footer from "./components/footer";
import PageLoader from "./components/pageLoader";
import ErrorContext from "./utils/errorContext";
import ValidationContext from "./utils/validationContext";

const Error404 = lazy(() => import("./pages/404/error404"));
const Error500 = lazy(() => import("./pages/500/error500"));
const AboutPage = lazy(() => import("./pages/about/aboutPage"));
const FAQPage = lazy(() => import("./pages/faq/faqPage"));
const ContactPage = lazy(() => import("./pages/contact/contactPage"));
const PrivacyPage = lazy(() => import("./pages/privacy/privacyPage"));
const RegisterPage = lazy(() => import("./pages/register/register"));
const LogoutPage = lazy(() => import("./pages/logout/logoutPage"));
const HomePage = lazy(() => import("./pages/home/homePage"));
const ExplorePage = lazy(() => import("./pages/explore/explorePage"));
const IndividualProduct = lazy(
  () => import("./pages/individualProduct/individualProduct")
);
const CartPage = lazy(() => import("./pages/cart/cartPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const errorState = useState<boolean>(false);
  const validationState = useState<string | null>(null);

  return (
    <div>
      <BrowserRouter>
        <ErrorContext.Provider value={errorState}>
          <ValidationContext.Provider value={validationState}>
            <QueryClientProvider client={queryClient}>
              <Header />
              <Suspense fallback={<PageLoader />}>
                <div
                  className="mt-16"
                  style={{ minHeight: "calc(100vh - 4rem)" }}
                >
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/products/:id"
                      element={<IndividualProduct />}
                    />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/error/500" element={<Error500 />} />
                    <Route path="*" element={<Error404 />} />
                  </Routes>
                  <VerifyAuth />
                </div>
                <Footer />
              </Suspense>
            </QueryClientProvider>
          </ValidationContext.Provider>
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
