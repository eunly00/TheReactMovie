import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';
import MovieCards from '../components/MovieCards';
import MovieTableView from '../components/MovieTableView';
import './SearchPage.css';

const SearchPage = () => {
    const username = localStorage.getItem('username');
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isTableView, setIsTableView] = useState(false);
    const [recommendations, setRecommendations] = useState(() => {
        const savedRecommendations = localStorage.getItem(`${username}_recommendations`);
        return savedRecommendations ? JSON.parse(savedRecommendations) : [];
    });
    const [filters, setFilters] = useState({
        genre: '',
        rating: '',
        sort: ''
    });

    useEffect(() => {
        fetchMovies();
    }, [page, filters]);

    const fetchMovies = async () => {
        setLoading(true);
        const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko-KR&page=${page}&sort_by=${filters.sort || 'popularity.desc'}&vote_average.gte=${filters.rating || '0'}${filters.genre ? `&with_genres=${filters.genre}` : ''}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
        setLoading(false);
    };

    const loadMoreMovies = () => {
        setPage(prev => prev + 1);
    };

    const toggleRecommendation = (movie) => {
        const updatedRecommendations = recommendations.some((m) => m.id === movie.id)
            ? recommendations.filter((m) => m.id !== movie.id)
            : [...recommendations, movie];

        setRecommendations(updatedRecommendations);
        localStorage.setItem(`${username}_recommendations`, JSON.stringify(updatedRecommendations));
    };

    const toggleView = () => {
        setIsTableView(!isTableView);
        setPage(1);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ genre: '', rating: '', sort: '' });
        setPage(1);
    };

    return (
        <div className="search-page">
            <div className="filter-container">
                <select name="genre" value={filters.genre} onChange={handleFilterChange}>
                    <option value="">장르 선택</option>
                    <option value="28">액션</option>
                    <option value="35">코미디</option>
                    <option value="18">드라마</option>
                    {/* Add more genre options as needed */}
                </select>
                <select name="rating" value={filters.rating} onChange={handleFilterChange}>
                    <option value="">평점 선택</option>
                    <option value="8">8점 이상</option>
                    <option value="7">7점 이상</option>
                    <option value="6">6점 이상</option>
                </select>
                <select name="sort" value={filters.sort} onChange={handleFilterChange}>
                    <option value="popularity.desc">인기순</option>
                    <option value="release_date.desc">최신순</option>
                    <option value="vote_average.desc">평점순</option>
                </select>
                <button onClick={clearFilters} className="clear-filters-button">초기화</button>
                <button onClick={toggleView} className="view-toggle-button">
                    {isTableView ? '무한 스크롤로 보기' : '테이블로 보기'}
                </button>
            </div>

            {isTableView ? (
                <MovieTableView movies={movies} toggleRecommendation={toggleRecommendation} recommendations={recommendations} />
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
                    <button onClick={loadMoreMovies} className="load-more-button">
                        더 보기
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
