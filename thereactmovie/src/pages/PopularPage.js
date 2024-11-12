import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';
import MovieCards from '../components/MovieCards';
import './PopularPage.css';

const PopularPage = () => {
    const username = localStorage.getItem('username');
    const [movies, setMovies] = useState([]);
    const [isTableView, setIsTableView] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(() => {
        const savedRecommendations = localStorage.getItem(`${username}_recommendations`);
        return savedRecommendations ? JSON.parse(savedRecommendations) : [];
    });
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
                loadMoreMovies();
            }
            setShowTopButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [page]);

    const fetchMovies = async () => {
        setLoading(true);
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovies(prev => [...prev, ...data.results]);
        setLoading(false);
    };

    const loadMoreMovies = () => {
        if (!loading) {
            setPage(prev => prev + 1);
        }
    };

    const toggleRecommendation = (movie) => {
        const updatedRecommendations = recommendations.some((m) => m.id === movie.id)
            ? recommendations.filter((m) => m.id !== movie.id)
            : [...recommendations, movie];

        setRecommendations(updatedRecommendations);
        localStorage.setItem(`${username}_recommendations`, JSON.stringify(updatedRecommendations));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleView = () => {
        setIsTableView(!isTableView);
        setPage(1);
    };

    return (
        <div className="popular-page">
            <div className="view-toggle-container">
                <button onClick={toggleView} className="view-toggle-button">
                    {isTableView ? '무한 스크롤로 보기' : '테이블로 보기'}
                </button>
            </div>

            {isTableView ? (
                <div className="table-view">
                    {/* 테이블 뷰 컴포넌트 삽입 */}
                </div>
            ) : (
                <div className="infinite-scroll-view">
                    {movies.map(movie => (
                        <MovieCards
                            key={movie.id}
                            movie={movie}
                            onClick={() => toggleRecommendation(movie)}
                            isRecommended={recommendations.some((m) => m.id === movie.id)}
                        />
                    ))}
                    {loading && <div className="loading-text">Loading...</div>}
                </div>
            )}

            {showTopButton && (
                <button className="top-button" onClick={scrollToTop}>
                    Top
                </button>
            )}
        </div>
    );
};

export default PopularPage;
