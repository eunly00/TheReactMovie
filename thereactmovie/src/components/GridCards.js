import React, { useState } from 'react';
import { Col } from 'antd';

function GridCards({ movie, isRecommended, onClick }) {
    const [isLoading, setIsLoading] = useState(true);
    const placeholderImage = "https://via.placeholder.com/320x320?text=No+Image"; // 기본 이미지 URL

    const handleImageLoad = () => setIsLoading(false);

    return (
        <Col lg={4} md={6} sm={12} xs={24} style={{ padding: '10px' }}>
            <div 
                onClick={onClick}
                style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    borderRadius: '10px', 
                    backgroundColor: isRecommended ? '#ffdfc4' : '#1e1e1e', // 추천 영화 스타일
                    cursor: 'pointer',
                    border: isRecommended ? '2px solid #e50914' : 'none',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <a href={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                    {isLoading && <div className="loading">Loading...</div>}
                    <img
                        style={{ 
                            width: '100%', 
                            height: '270px', 
                            objectFit: 'cover', 
                            display: isLoading ? 'none' : 'block',
                            transition: 'transform 0.3s ease-in-out' 
                        }}
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImage}
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
                        boxSizing: 'border-box'
                    }}>
                        <h4 style={{ margin: '5px 0', fontSize: '16px' }}>{movie.original_title}</h4>
                    </div>
                </a>
            </div>
        </Col>
    );
}

export default GridCards;
