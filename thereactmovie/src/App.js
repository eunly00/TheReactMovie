// src/App.js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home"; // Home 페이지
import Header from './components/Header';
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Header />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
