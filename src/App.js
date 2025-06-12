import React from "react";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import Home from "routes/home/home.component";
import Navigation from "routes/navigation/navigation.component";
import Authenticate from "routes/authenticate/authenticate.component";

const Shop = () => {
  return (
    <div>
      <h1>I am the shop</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
  <Route path="/" element={<Navigation />}>
    <Route index element={<Home />} />
    <Route path="shop" element={<Shop />} />
    <Route path="sign-in" element={<Authenticate />} />  // ✅ FIXED
  </Route>
</Routes>
  );
};

export default App;
