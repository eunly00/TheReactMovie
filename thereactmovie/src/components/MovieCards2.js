// src/components/MovieCards.js
import React from "react";
import "./MovieCards2.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCards = ({ movie }) => {
    return (
        <div className="movie-card">
            <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/placeholder.png"}
                alt={movie.title}
                className="movie-poster"
            />
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-overview">
                    {movie.overview.length > 100
                        ? `${movie.overview.slice(0, 100)}...`
                        : movie.overview}
                </p>
            </div>
        </div>
    );
};

export default MovieCards;
