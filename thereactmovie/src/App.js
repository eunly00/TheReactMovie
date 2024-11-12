import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import AuthPage from './pages/Auth/AuthPage';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AuthPage />} /> {/* 로그인 및 회원가입 경로 */}
            </Routes>
        </Router>
    );
}

export default App;
