import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Review from "./pages/review";
import Policy from "./pages/policy";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Review />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
