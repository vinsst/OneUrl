import React from "react";

import Header from "./components/Header";

import Review from "./pages/review";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <Review />
      </div>
    </div>
  );
}

export default App;
