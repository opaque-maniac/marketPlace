import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { ErrorContext, ShowErrorContext } from "./utils/errorContext";
import Header from "./components/header";
import Footer from "./components/footer";
import PageLoader from "./components/pageloader";
import ProtectedRoute from "./components/routes/protectedroutes";
import AuthRoute from "./components/routes/authroutes";
import ScrollResetRoute from "./components/routes/scrolltotop";

const HomePage = lazy(() => import("./pages/home/page"));
const LoginPage = lazy(() => import("./pages/login/page"));
const Error404 = lazy(() => import("./pages/404/page"));
const Error500 = lazy(() => import("./pages/500/page"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const AboutPage = lazy(() => import("./pages/about/page"));
const RegisterPage = lazy(() => import("./pages/register/page"));
const ProductPage = lazy(() => import("./pages/product/page"));
const NewProductPage = lazy(() => import("./pages/new/page"));
const ProfilePage = lazy(() => import("./pages/profile/page"));
const UpdateProfilePage = lazy(() => import("./pages/editprofile/page"));
const DeleteProductPage = lazy(() => import("./pages/delete/page"));
const EditProductPage = lazy(() => import("./pages/edit/page"));
const FeePage = lazy(() => import("./pages/fee/page"));
const PrivacyPage = lazy(() => import("./pages/privacy/page"));
const FAQPage = lazy(() => import("./pages/faq/page"));
const TermsPage = lazy(() => import("./pages/terms/page"));
const DeleteProfilePage = lazy(() => import("./pages/deleteprofile/page"));
const RefreshTokenPage = lazy(() => import("./pages/refreshtoken/page"));
const OrdersPage = lazy(() => import("./pages/orders/page"));
const IndividualOrderPage = lazy(() => import("./pages/order/page"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

const App = () => {
  const error = useState<boolean>(false);
  const showError = useState<null | string>(null);

  return (
    <div>
      <BrowserRouter>
        <ErrorContext.Provider value={error}>
          <ShowErrorContext.Provider value={showError}>
            <QueryClientProvider client={queryClient}>
              <Header />
              <div className="pt-14 mx-auto lg:max-w-1300 min-h-screen">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route element={<ScrollResetRoute />}>
                      <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products/:id" element={<ProductPage />} />
                        <Route
                          path="/products/:id/delete"
                          element={<DeleteProductPage />}
                        />
                        <Route
                          path="/products/:id/edit"
                          element={<EditProductPage />}
                        />
                        <Route path="/new" element={<NewProductPage />} />
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
                          path="/refresh-token"
                          element={<RefreshTokenPage />}
                        />
                      </Route>
                      <Route element={<AuthRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                      </Route>
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/fees" element={<FeePage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/terms" element={<TermsPage />} />
                      <Route path="/500" element={<Error500 />} />
                      <Route path="*" element={<Error404 />} />
                    </Route>
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
