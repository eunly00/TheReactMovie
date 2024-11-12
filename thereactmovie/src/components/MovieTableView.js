import React, { useState } from 'react';
import { IMAGE_BASE_URL } from '../Config';
import './MovieTableView.css';

const MovieTableView = ({ movies, toggleRecommendation, recommendations }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const paginatedMovies = movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="movie-table-view">
            <table className="movie-table">
                <thead>
                    <tr>
                        <th>포스터</th>
                        <th>영화 제목</th>
                        <th>평점</th>
                        <th>개봉일</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedMovies.map(movie => (
                        <tr 
                            key={movie.id} 
                            className={`movie-row ${recommendations.some((m) => m.id === movie.id) ? 'recommended' : ''}`}
                            onClick={() => toggleRecommendation(movie)}
                        >
                            <td>
                                <img 
                                    src={movie.poster_path ? `${IMAGE_BASE_URL}w200${movie.poster_path}` : null} 
                                    alt={movie.title} 
                                    style={{ width: '100px', transition: 'transform 0.3s ease-in-out' }}
                                    className="movie-poster"
                                />
                            </td>
                            <td>{movie.title}</td>
                            <td>{movie.vote_average}</td>
                            <td>{movie.release_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>이전 페이지</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>다음 페이지</button>
            </div>
        </div>
    );
};

export default MovieTableView;
