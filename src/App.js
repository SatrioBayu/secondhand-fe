import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Catalog, Details, ShoppingCart, Wishlist, Register, NotificationVertical, Account, DashboardBuyer, DashboardSeller, MyProduct, Error } from "./pages";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/productdetails/:id" element={<Details />} />
          <Route
            path="/shoppingcart"
            element={
              <Protected>
                <ShoppingCart />
              </Protected>
            }
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/notification"
            element={
              <Protected>
                <NotificationVertical />
              </Protected>
            }
          />
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route
            path="/dashboardbuyer"
            element={
              <Protected>
                <DashboardBuyer />
              </Protected>
            }
          />
          <Route
            path="/dashboardseller"
            element={
              <Protected>
                <DashboardSeller />
              </Protected>
            }
          />
          <Route
            path="/myproduct"
            element={
              <Protected>
                <MyProduct />
              </Protected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      {/* )} */}
    </div>
  );
}

export default App;
