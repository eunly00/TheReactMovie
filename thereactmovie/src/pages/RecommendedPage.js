import React, { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../api/tmdbApi";
import MovieCards from "../components/MovieCards2";
import "./RecommendedPage.css"

const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getRecommendations = async () => {
            setIsLoading(true);

            // Local Storage에서 Wishlist 가져오기
            const username = localStorage.getItem("loggedInUser");
            const wishlist = JSON.parse(localStorage.getItem(`${username}_recommendations`)) || [];

            if (wishlist.length === 0) {
                setRecommendations([]);
                setIsLoading(false);
                return;
            }

            // Wishlist에서 장르 ID 추출
            const genreCounts = {};
            wishlist.forEach((movie) => {
                movie.genre_ids.forEach((id) => {
                    genreCounts[id] = (genreCounts[id] || 0) + 1;
                });
            });

            // 가장 많이 등장한 장르 추출
            const sortedGenres = Object.entries(genreCounts)
                .sort((a, b) => b[1] - a[1]) // 장르 등장 횟수 기준으로 정렬
                .map(([genreId]) => genreId);

            // TMDB API 호출로 추천 영화 가져오기
            const movies = await fetchMoviesByGenre(sortedGenres.slice(0, 3)); // 상위 3개의 장르 사용
            setRecommendations(movies);
            setIsLoading(false);
        };

        getRecommendations();
    }, []);

    return (
        <div className="recommendations-page">
            <h1>추천 영화</h1>
            {isLoading ? (
                <p className="loading-text">추천 영화를 가져오는 중...</p>
            ) : recommendations.length > 0 ? (
                <div className="movies-grid">
                    {recommendations.map((movie) => (
                        <MovieCards key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="no-movies-text">추천할 영화가 없습니다.</p>
            )}
        </div>
    );
};

export default RecommendationsPage;