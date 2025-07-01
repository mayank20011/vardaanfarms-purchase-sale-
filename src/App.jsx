import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Purchase from "./Pages/Purchase/Purchase";
import Dispatch from "./Pages/Dispatch/Dispatch";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/dispatch" element={<Dispatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
