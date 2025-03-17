import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { ErrorContext, ShowErrorContext } from "./utils/errorContext";
import Header from "./components/header";
import Footer from "./components/footer";
import PageLoader from "./components/pageloader";
import AuthRoute from "./components/routes/authroutes";
import ProtectedRoute from "./components/routes/protectedroute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminOnlyRoutes from "./components/routes/adminonlyroutes";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/scrolltotop";

const HomePage = lazy(() => import("./pages/home/page"));
const LoginPage = lazy(() => import("./pages/login/page"));
const Error404 = lazy(() => import("./pages/404/page"));
const Error500 = lazy(() => import("./pages/500/page"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const AboutPage = lazy(() => import("./pages/about/page"));
const RegisterPage = lazy(() => import("./pages/register/page"));
const FeePage = lazy(() => import("./pages/fee/page"));
const PrivacyPage = lazy(() => import("./pages/privacy/page"));
const FAQPage = lazy(() => import("./pages/faq/page"));
const TermsPage = lazy(() => import("./pages/terms/page"));
const ProductsPage = lazy(() => import("./pages/products/page"));
const IndividualProductPage = lazy(() => import("./pages/product/page"));
const EditProductPage = lazy(() => import("./pages/editproduct/page"));
const CustomersPage = lazy(() => import("./pages/customers/page"));
const CustomerPage = lazy(() => import("./pages/customer/page"));
const CustomerCartPage = lazy(() => import("./pages/customer-cart/page"));
const CustomerWishlistPage = lazy(
  () => import("./pages/customer-wishlist/page"),
);
const CustomerOrdersPage = lazy(() => import("./pages/customer-orders/page"));
const CustomerEditPage = lazy(() => import("./pages/customer-edit/page"));
const CustomerDeletePage = lazy(() => import("./pages/customer-delete/page"));
const CustomerDisablePage = lazy(() => import("./pages/customer-disable/page"));
const CustomerMisconductsPage = lazy(
  () => import("./pages/customer-misconducts/page"),
);
const CustomerNewMisconductPage = lazy(
  () => import("./pages/customer-new-misconduct/page"),
);
const SellersPage = lazy(() => import("./pages/sellers/page"));
const SellerPage = lazy(() => import("./pages/seller/page"));
const SellerOrdersPage = lazy(() => import("./pages/seller-orders/page"));
const SellerMisconductsPage = lazy(
  () => import("./pages/seller-misconducts/page"),
);
const SellerNewMisconductPage = lazy(
  () => import("./pages/seller-new-misconduct/page"),
);
const SellerEditPage = lazy(() => import("./pages/seller-edit/page"));
const SellerDeletePage = lazy(() => import("./pages/seller-delete/page"));
const SellerDisablePage = lazy(() => import("./pages/seller-disable/page"));
const StaffPage = lazy(() => import("./pages/staff/page"));
const StaffProfilePage = lazy(() => import("./pages/staff-profile/page"));
const StaffMisconductsPage = lazy(
  () => import("./pages/staff-misconducts/page"),
);
const StaffNewMisconductPage = lazy(
  () => import("./pages/staff-new-misconduct/page"),
);
const StaffEditPage = lazy(() => import("./pages/staff-edit/page"));
const StaffDisablePage = lazy(() => import("./pages/staff-disable/page"));
const StaffDeletePage = lazy(() => import("./pages/staff-delete/page"));
const OrdersPage = lazy(() => import("./pages/orders/page"));
const ComplaintsPage = lazy(() => import("./pages/complaints/page"));
const MisconductsPage = lazy(() => import("./pages/misconducts/page"));
const MisconductPage = lazy(() => import("./pages/misconduct/page"));
const ProfilePage = lazy(() => import("./pages/profile/page"));
const ProfileUpdatePage = lazy(() => import("./pages/profile-update/page"));
const ProfileDeletePage = lazy(() => import("./pages/profile-delete/page"));
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

  return (
    <div>
      <BrowserRouter>
        <ErrorContext.Provider value={error}>
          <ShowErrorContext.Provider value={err}>
            <QueryClientProvider client={queryClient}>
              <Header />
              <ScrollToTop />
              <div className="pt-14 mx-auto lg:max-w-1300 min-h-screen">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/fees" element={<FeePage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/products" element={<ProductsPage />} />
                      <Route
                        path="/products/:id"
                        element={<IndividualProductPage />}
                      />
                      <Route
                        path="/products/:id/edit"
                        element={<EditProductPage />}
                      />
                      <Route path="/customers" element={<CustomersPage />} />
                      {/* Customers */}
                      <Route path="/customers/:id" element={<CustomerPage />} />
                      <Route
                        path="/customers/:id/cart"
                        element={<CustomerCartPage />}
                      />
                      <Route
                        path="/customers/:id/wishlist"
                        element={<CustomerWishlistPage />}
                      />
                      <Route
                        path="/customers/:id/orders"
                        element={<CustomerOrdersPage />}
                      />
                      <Route
                        path="/customers/:id/edit"
                        element={<CustomerEditPage />}
                      />
                      <Route
                        path="/customers/:id/disable"
                        element={<CustomerDisablePage />}
                      />
                      <Route
                        path="/customers/:id/misconducts"
                        element={<CustomerMisconductsPage />}
                      />
                      <Route
                        path="/customers/:id/misconducts/new"
                        element={<CustomerNewMisconductPage />}
                      />
                      <Route element={<AdminOnlyRoutes />}>
                        <Route
                          path="/customers/:id/delete"
                          element={<CustomerDeletePage />}
                        />
                      </Route>

                      {/* Sellers */}
                      <Route path="/sellers" element={<SellersPage />} />
                      <Route path="/sellers/:id" element={<SellerPage />} />
                      <Route
                        path="/sellers/:id/orders"
                        element={<SellerOrdersPage />}
                      />
                      <Route
                        path="/sellers/:id/misconducts"
                        element={<SellerMisconductsPage />}
                      />
                      <Route
                        path="/sellers/:id/misconducts/new"
                        element={<SellerNewMisconductPage />}
                      />
                      <Route
                        path="/sellers/:id/edit"
                        element={<SellerEditPage />}
                      />
                      <Route
                        path="/sellers/:id/disable"
                        element={<SellerDisablePage />}
                      />

                      <Route element={<AdminOnlyRoutes />}>
                        <Route
                          path="/sellers/:id/delete"
                          element={<SellerDeletePage />}
                        />
                      </Route>

                      {/* Staff */}
                      <Route path="/staff" element={<StaffPage />} />
                      <Route
                        path="/staff/:id/"
                        element={<StaffProfilePage />}
                      />
                      <Route
                        path="/staff/:id/edit"
                        element={<StaffEditPage />}
                      />
                      <Route
                        path="/staff/:id/misconducts"
                        element={<StaffMisconductsPage />}
                      />
                      <Route
                        path="/staff/:id/misconducts/new"
                        element={<StaffNewMisconductPage />}
                      />

                      <Route
                        path="/staff/:id/disable"
                        element={<StaffDisablePage />}
                      />
                      <Route element={<AdminOnlyRoutes />}>
                        <Route
                          path="/staff/:id/delete"
                          element={<StaffDeletePage />}
                        />
                      </Route>

                      {/* Orders */}
                      <Route path="/orders" element={<OrdersPage />} />

                      {/* Complaints */}
                      <Route path="/complaints" element={<ComplaintsPage />} />

                      {/* Misconducts */}
                      <Route
                        path="/misconducts"
                        element={<MisconductsPage />}
                      />
                      <Route
                        path="/misconducts/:id"
                        element={<MisconductPage />}
                      />

                      {/* Settings */}
                      <Route path="/settings" element={<SettingsPage />} />

                      {/* Profile */}
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route
                        path="/profile/update"
                        element={<ProfileUpdatePage />}
                      />
                      <Route
                        path="/profile/delete"
                        element={<ProfileDeletePage />}
                      />

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
