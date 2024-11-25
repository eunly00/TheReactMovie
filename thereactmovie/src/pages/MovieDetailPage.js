import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../Config';
import './MovieDetailPage.css'; // 스타일을 별도 파일로 관리

const MovieDetailPage = () => {
    const { movieId } = useParams(); 
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
            const response = await fetch(endpoint);
            const data = await response.json();
            setMovie(data);
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-detail-page">
            <div
                className="movie-banner"
                style={{ backgroundImage: `url(${IMAGE_BASE_URL}w1280${movie.backdrop_path})` }}
            >
                <div className="movie-content">
                    <h1 className="movie-title">{movie.original_title}</h1>
                    <p className="movie-overview">{movie.overview}</p>
                    <p className="movie-genres">
                        {movie.genres.map((genre) => genre.name).join(', ')}
                    </p>
                    <p className="movie-release-date">Release Date: {movie.release_date}</p>
                    <p className="movie-rating">Rating: {movie.vote_average}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
