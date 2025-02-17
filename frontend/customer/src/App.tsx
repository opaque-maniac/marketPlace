import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import {
  ErrorContext,
  ShowErrorContext,
  ShowMessageContext,
} from "./utils/errorContext";
import Header from "./components/header";
import Footer from "./components/footer";
import PageLoader from "./components/pageloader";
import ScrollToTop from "./utils/scrolltotop";
import ProtectedRoute from "./components/protectedroute";
import AuthRoute from "./components/authroute";
import ServerErrorRoute from "./components/servererrorroute";

const HomePage = lazy(() => import("./pages/home/page"));
const LoginPage = lazy(() => import("./pages/login/page"));
const Error404 = lazy(() => import("./pages/404/page"));
const Error500 = lazy(() => import("./pages/500/page"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const AboutPage = lazy(() => import("./pages/about/page"));
const RegisterPage = lazy(() => import("./pages/register/page"));
const ProfilePage = lazy(() => import("./pages/profile/page"));
const UpdateProfilePage = lazy(() => import("./pages/editprofile/page"));
const FeePage = lazy(() => import("./pages/fee/page"));
const PrivacyPage = lazy(() => import("./pages/privacy/page"));
const FAQPage = lazy(() => import("./pages/faq/page"));
const TermsPage = lazy(() => import("./pages/terms/page"));
const DeleteProfilePage = lazy(() => import("./pages/deleteprofile/page"));
const IndividualProductPage = lazy(() => import("./pages/product/page"));
const ExplorePage = lazy(() => import("./pages/explore/page"));
const WishlistPage = lazy(() => import("./pages/wishlist/page"));
const CartPage = lazy(() => import("./pages/cart/page"));
const CategoriesPage = lazy(() => import("./pages/categories/page"));
const RefreshTokenPage = lazy(() => import("./pages/refreshtoken/page"));
const OrdersPage = lazy(() => import("./pages/orders/page"));
const IndividualOrderPage = lazy(() => import("./pages/order/page"));
const PayOrderPage = lazy(() => import("./pages/pay-order/page"));
const SellerProfilePage = lazy(() => import("./pages/seller/page"));
const SellerPRoductsPage = lazy(() => import("./pages/sellerproducts/page"));
const SettingsPage = lazy(() => import("./pages/settings/page"));
const EmailVerificationPage = lazy(() => import("./pages/verify-email/page"));
const EmailVerificationTokenPage = lazy(
  () => import("./pages/verify-email-token/page"),
);
const EmailVerificationConfirmationPage = lazy(
  () => import("./pages/verify-email-confirm/page"),
);
const ResetPasswordPage = lazy(() => import("./pages/reset-password/page"));
const ResetPasswordTokenPage = lazy(
  () => import("./pages/reset-password-token/page"),
);
const PassswordResetConfirmationPage = lazy(
  () => import("./pages/reset-password-confirm/page"),
);
const ChangeEmailPage = lazy(() => import("./pages/change-email/page"));
const ChangeEmailTokenPage = lazy(
  () => import("./pages/change-email-token/page"),
);
const ChangeEmailConfirmationPage = lazy(
  () => import("./pages/change-email-confirm/page"),
);
const ChangePasswordPage = lazy(() => import("./pages/change-password/page"));
const ChangePasswordTokenPage = lazy(
  () => import("./pages/change-password-token/page"),
);
const ChangePasswordConfirmationPage = lazy(
  () => import("./pages/change-password-confirm/page"),
);

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
  const msg = useState<string | null>(null);

  return (
    <div>
      <BrowserRouter>
        <ErrorContext.Provider value={error}>
          <ShowErrorContext.Provider value={err}>
            <ShowMessageContext.Provider value={msg}>
              <QueryClientProvider client={queryClient}>
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
                      <Route
                        path="/sellers/:id"
                        element={<SellerProfilePage />}
                      />
                      <Route
                        path="/sellers/:id/products"
                        element={<SellerPRoductsPage />}
                      />
                      <Route path="/explore" element={<ExplorePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/fees" element={<FeePage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/terms" element={<TermsPage />} />
                      <Route element={<ProtectedRoute />}>
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/cart" element={<CartPage />} />
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
                        <Route
                          path="/orders/:id"
                          element={<IndividualOrderPage />}
                        />
                        <Route
                          path="/orders/:id/pay"
                          element={<PayOrderPage />}
                        />
                        <Route
                          path="/refresh-token"
                          element={<RefreshTokenPage />}
                        />
                        <Route path="/settings" element={<SettingsPage />} />

                        {/* Change email */}
                        <Route
                          path="/change-email"
                          element={<ChangeEmailPage />}
                        />
                        <Route
                          path="/change-email/:token"
                          element={<ChangeEmailTokenPage />}
                        />
                        <Route
                          path="/change-email-confirm"
                          element={<ChangeEmailConfirmationPage />}
                        />
                        <Route
                          path="/change-password"
                          element={<ChangePasswordPage />}
                        />
                        <Route
                          path="/change-password/:token"
                          element={<ChangePasswordTokenPage />}
                        />
                        <Route
                          path="/change-password-confirm"
                          element={<ChangePasswordConfirmationPage />}
                        />
                      </Route>
                      <Route element={<AuthRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Email verification */}
                        <Route
                          path="/verify-email"
                          element={<EmailVerificationPage />}
                        />
                        <Route
                          path="/verify-email/:token"
                          element={<EmailVerificationTokenPage />}
                        />
                        <Route
                          path="/verify-confirm"
                          element={<EmailVerificationConfirmationPage />}
                        />
                        <Route
                          path="/reset-password"
                          element={<ResetPasswordPage />}
                        />
                        <Route
                          path="/reset-password/:token"
                          element={<ResetPasswordTokenPage />}
                        />
                        <Route
                          path="/reset-confirm"
                          element={<PassswordResetConfirmationPage />}
                        />
                      </Route>
                      <Route element={<ServerErrorRoute />}>
                        <Route path="/500" element={<Error500 />} />
                      </Route>
                      <Route path="*" element={<Error404 />} />
                    </Routes>
                  </Suspense>
                </div>
                <Footer />
              </QueryClientProvider>
            </ShowMessageContext.Provider>
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
