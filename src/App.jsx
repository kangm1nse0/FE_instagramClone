import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/image/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;