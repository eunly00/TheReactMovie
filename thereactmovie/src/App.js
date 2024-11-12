import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import AuthPage from './pages/Auth/AuthPage';
import Header from './components/Header';
import MovieDetailPage from './pages/MovieDetailPage'; // 상세정보 페이지

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AuthPage />} /> {/* 로그인 및 회원가입 경로 */}
                <Route path="/movie/:movieId" element={<MovieDetailPage />} /> {/* 영화 상세정보 페이지 */}
            </Routes>
        </Router>
    );
}

export default App;
