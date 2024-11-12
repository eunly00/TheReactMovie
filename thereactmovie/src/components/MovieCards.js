import React, { useState } from 'react';
import { Col } from 'antd';
import './MovieCards.css';
import { IMAGE_BASE_URL } from '../Config';

function MovieCards({ movie, isRecommended, onClick }) {
    const [isLoading, setIsLoading] = useState(true);
    const placeholderImage = "https://via.placeholder.com/320x320?text=No+Image"; // 기본 이미지 URL

    const handleImageLoad = () => setIsLoading(false);

    return (
        <Col lg={4} md={6} sm={12} xs={24} style={{ padding: '10px' }}>
            <div 
                onClick={onClick}  // 클릭 시 추천 추가/제거
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
            >
                {isLoading && <div className="loading">Loading...</div>}
                <img
                    style={{ 
                        width: '100%', 
                        height: '270px', 
                        objectFit: 'cover', 
                        display: isLoading ? 'none' : 'block',
                        transition: 'transform 0.3s ease-in-out',
                    }}
                    src={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : placeholderImage}
                    alt={movie.original_title}
                    onLoad={handleImageLoad}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
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
