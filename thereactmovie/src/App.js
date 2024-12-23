import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import AuthPage from './pages/Auth/AuthPage';
import Header from './components/Header';
import MovieDetailPage from './pages/MovieDetailPage'; // 상세정보 페이지
import PopularPage from './pages/PopularPage'; // 대세 콘텐츠 페이지 추가
import SearchPage from './pages/Search';
import WishlistPage from './pages/Wishlist';
import RecommendedPage from './pages/RecommendedPage';
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AuthPage />} /> {/* 로그인 및 회원가입 경로 */}
                <Route path="/movie/:movieId" element={<MovieDetailPage />} /> {/* 영화 상세정보 페이지 */}
                <Route path="/popular" element={<PopularPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/recommended" element={<RecommendedPage />} />
            </Routes>
        </Router>
    );
}

export default App;
