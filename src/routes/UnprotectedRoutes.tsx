// dependencies
import React from "react";

import { Routes, Route } from "react-router";

// screens
import Auth  from "@/modules/auth/login";
import Revenue from "@/modules/revenue";

const UnProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index Component={Auth} />
        {/* <Route index Component={Revenue} /> */}
      </Route>
    </Routes>
  );
};

export default UnProtectedRoutes;
