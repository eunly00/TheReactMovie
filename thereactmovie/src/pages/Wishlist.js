// src/pages/WishlistPage.js
import React, { useEffect, useState } from 'react';
import MovieCards from '../components/MovieCards';
import MovieTableView from '../components/MovieTableView';
import './WishlistPage.css';

const WishlistPage = () => {
    const username = localStorage.getItem('loggedInUser'); // 현재 로그인한 사용자 이름 가져오기
    const [recommendations, setRecommendations] = useState([]);
    const [isTableView, setIsTableView] = useState(false); // 초기 view 설정 (테이블/무한스크롤)
  
    useEffect(() => {
        // 계정별 추천 목록을 Local Storage에서 불러오기
        const savedRecommendations = localStorage.getItem(`${username}_recommendations`);
        setRecommendations(savedRecommendations ? JSON.parse(savedRecommendations) : []);
    }, [username]); // username이 변경될 때마다 실행

    const toggleView = () => {
        setIsTableView(!isTableView);
    };

    const toggleRecommendation = (movie) => {
        // 추천 추가/제거 기능
        const updatedRecommendations = recommendations.some((m) => m.id === movie.id)
            ? recommendations.filter((m) => m.id !== movie.id)
            : [...recommendations, movie];

        setRecommendations(updatedRecommendations);
        localStorage.setItem(`${username}_recommendations`, JSON.stringify(updatedRecommendations));
    };

    return (
        <div className="wishlist-page">
            <h2>{username}님의 추천 영화 목록</h2>
            <div className="view-toggle-container">
                <button onClick={toggleView} className="view-toggle-button">
                    {isTableView ? '무한 스크롤로 보기' : '테이블로 보기'}
                </button>
            </div>

            {isTableView ? (
                <MovieTableView
                    movies={recommendations}
                    toggleRecommendation={toggleRecommendation}
                    recommendations={recommendations}
                />
            ) : (
                <div className="infinite-scroll-view">
                    {recommendations.map((movie) => (
                        <MovieCards
                            key={movie.id}
                            movie={movie}
                            onClick={() => toggleRecommendation(movie)}
                            isRecommended={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
