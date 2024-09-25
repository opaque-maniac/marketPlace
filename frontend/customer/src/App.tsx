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

const HomePage = lazy(() => import("./pages/home/page"));
const LoginPage = lazy(() => import("./pages/login/page"));
const Error404 = lazy(() => import("./pages/404/page"));
const Error500 = lazy(() => import("./pages/500/page"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const AboutPage = lazy(() => import("./pages/about/page"));
const RegisterPage = lazy(() => import("./pages/register/page"));
const LogoutPage = lazy(() => import("./pages/logout/page"));
const ProfilePage = lazy(() => import("./pages/profile/page"));
const UpdateProfilePage = lazy(() => import("./pages/editprofile/page"));
const FeePage = lazy(() => import("./pages/fee/page"));
const PrivacyPage = lazy(() => import("./pages/privacy/page"));
const FAQPage = lazy(() => import("./pages/faq/page"));
const TermsPage = lazy(() => import("./pages/terms/page"));
const DeleteProfilePage = lazy(() => import("./pages/deleteprofile/page"));
const OrdersPage = lazy(() => import("./pages/orders/page"));
const IndividualProductPage = lazy(() => import("./pages/product/page"));
const ExplorePage = lazy(() => import("./pages/explore/page"));
const SearchPage = lazy(() => import("./pages/search/page"));
const WishlistPage = lazy(() => import("./pages/wishlist/page"));
const CartPage = lazy(() => import("./pages/cart/page"));
const CategoriesPage = lazy(() => import("./pages/categories/page"));
const RefreshTokenPage = lazy(() => import("./pages/refreshtoken/page"));

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
                    <Route
                      path="/products/:id"
                      element={<IndividualProductPage />}
                    />
                    <Route
                      path="/categories/:category"
                      element={<CategoriesPage />}
                    />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/fees" element={<FeePage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                      path="/profile/update"
                      element={<UpdateProfilePage />}
                    />
                    <Route
                      path="/profile/delete"
                      element={<DeleteProfilePage />}
                    />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route
                      path="/refresh-token"
                      element={<RefreshTokenPage />}
                    />
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
