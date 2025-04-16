import React from "react";
import { Routes, Route } from "react-router";
import Login from "@/modules/auth/login.tsx";
import DashboardLayout from "@/modules/home/layout";
import HomePage from "@/modules/home";
import Users from "@/modules/institutions";
import Revenue from "@/modules/revenue";
// import UserProfile from "@/modules/users/components/userProfile"

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/" element={<UserProfile />}> */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="institutions" element={<Users />} />
        <Route path="revenue" element={<Revenue />} />
      </Route>
    </Routes>
  );
};

export default Router;
