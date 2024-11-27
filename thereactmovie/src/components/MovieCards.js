import React, { useState } from 'react';
import { Col } from 'antd';
import './MovieCards.css';
import { IMAGE_BASE_URL } from '../Config';

function MovieCards({ movie, isRecommended, onClick }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isTouched, setIsTouched] = useState(false); // 모바일 터치 상태 관리
    const placeholderImage = "https://via.placeholder.com/320x320?text=No+Image";

    const handleImageLoad = () => setIsLoading(false);

    return (
        <Col lg={4} md={6} sm={12} xs={24} style={{ padding: '10px' }}>
            <div
                onClick={onClick} // 클릭 시 추천 추가/제거
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    backgroundColor: isRecommended ? '#333' : '#1e1e1e',
                    cursor: 'pointer',
                    border: isRecommended ? '2px solid #b8b8b8' : 'none',
                    color: 'white',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out',
                }}
                onTouchStart={() => setIsTouched(true)} // 터치 시 확대
                onTouchEnd={() => setIsTouched(false)} // 터치 종료 시 원상 복구
            >
                {isLoading && <div className="loading">Loading...</div>}
                <img
                    style={{
                        width: '100%',
                        height: '270px',
                        objectFit: 'cover',
                        display: isLoading ? 'none' : 'block',
                        transform: isTouched ? 'scale(1.05)' : 'scale(1)', // 터치 상태에 따라 확대
                        transition: 'transform 0.3s ease-in-out',
                    }}
                    src={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : placeholderImage}
                    alt={movie.original_title}
                    onLoad={handleImageLoad}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} // 데스크톱 호버
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} // 데스크톱 원상복구
                />
                <div style={{
                    padding: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    boxSizing: 'border-box',
                }}>
                    <h4 style={{
                        margin: '5px 0',
                        fontSize: '16px',
                        color: 'white'
                    }}>
                        {movie.original_title}
                    </h4>
                </div>
            </div>
        </Col>
    );
}

export default MovieCards;
