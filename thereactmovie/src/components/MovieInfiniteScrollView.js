import React, { useEffect } from 'react';
import { Spin } from 'antd';

const MovieInfiniteScrollView = ({ movies, loadMoreMovies, hasMore }) => {
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
            loadMoreMovies();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <div key={movie.id} className="movie-item">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : null} alt={movie.title} />
                    <h3>{movie.title}</h3>
                </div>
            ))}
            {hasMore && <Spin tip="Loading..." />}
            <button className="scroll-top-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
        </div>
    );
};

export default MovieInfiniteScrollView;
