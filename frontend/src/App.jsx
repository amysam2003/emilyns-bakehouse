import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import EmilynAdminDashboard from "./components/EmilynAdminDashboard";
import EmilynProductList from "./components/EmilynProductList";
import EmilynProductForm from "./components/EmilynProductForm";
import EmilynEditProduct from "./components/EmilynEditProduct";
import CustomerHome from "./pages/CustomerHome";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import EmilynProductCatalog from "./pages/EmilynProductCatalog";
import EmilynCart from "./pages/EmilynCart";
import EmilynCheckoutPage from "./pages/EmilynCheckoutPage";
import FindUsPage from "./pages/FindUsPage";
import UserDashboard from "./components/UserDashboard";
import UserOrders from "./components/UserOrders";
import OrderDetail from "./components/OrderDetail";
import UserProfile from "./components/UserProfile";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import RequireAdmin from "./components/auth/RequireAdmin";
import RequireCustomerAuth from "./components/auth/RequireCustomerAuth";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/menu" element={<EmilynProductCatalog />} />
        <Route path="/cart" element={<EmilynCart />} />
        <Route path="/checkout" element={<EmilynCheckoutPage />} />
        <Route path="/find-us" element={<FindUsPage />} />
        <Route path="/dashboard" element={<RequireCustomerAuth><UserDashboard /></RequireCustomerAuth>}>
          <Route index element={<div>Hello! Welcome to your dashboard</div>} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdmin><EmilynAdminDashboard /></RequireAdmin>}>
          <Route index element={<EmilynProductList />} />
          <Route path="add" element={<EmilynProductForm />} />
          <Route path="edit/:id" element={<EmilynEditProduct />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}