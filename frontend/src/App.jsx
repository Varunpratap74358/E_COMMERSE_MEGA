import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLyout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import NotFound from "./pages/not-found";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/comman/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturn from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // console.log(isLoading)

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // if(!isLoading){
  //   return [1,2,3,4].map((v,i)=>(<div key={i} className="flex m-10 flex-col space-y-3">
  //     <Skeleton className="h-[125px] bg-gray-300 w-[250px] rounded-xl" />
  //     <div className="space-y-2">
  //       <Skeleton className="h-4 w-[250px]" />
  //       <Skeleton className="h-4 w-[200px]" />
  //     </div>
  //   </div>))

  // }

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col overflow-hidden bg-white">
          {/* <h1>Header Componante</h1> */}

          <Routes>
            <Route path="/"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                
                </CheckAuth>
              }
            />
            <Route
              path="/auth"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout />
                </CheckAuth>
              }
            >
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
            </Route>

            <Route
              path="/admin"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLyout />
                </CheckAuth>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="features" element={<AdminFeatures />} />
            </Route>

            <Route
              path="/shop"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingLayout />
                </CheckAuth>
              }
            >
              <Route path="home" element={<ShoppingHome />} />
              <Route path="listing" element={<ShoppingListing />} />
              <Route path="checkout" element={<ShoppingCheckout />} />
              <Route path="account" element={<ShoppingAccount />} />
              <Route path="paypal-return" element={<PaypalReturn />} />
              <Route path="payment-success" element={<PaymentSuccessPage />} />
              <Route path="search" element={<SearchProducts />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            <Route path="unauth-page" element={<UnauthPage />} />
          </Routes>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {[1, 2, 3, 4, 5, 6].map((v, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] bg-gray-300 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
