import React, { useState } from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 사용

function GridCards({ movie, isRecommended, onClick, genres }) {
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
                    backgroundColor: isRecommended ? '#333' : '#1e1e1e', // 추천 영화 스타일
                    cursor: 'pointer',
                    border: isRecommended ? '2px solid #b8b8b8' : 'none', // 테두리 색 자연스럽게 변경
                    color: 'white',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out',  // 이미지 확대 효과
                }}
            >
                {/* Link 컴포넌트 사용하여 상세페이지로 라우팅 */}
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                    {isLoading && <div className="loading">Loading...</div>}
                    <img
                        style={{ 
                            width: '100%', 
                            height: '270px', 
                            objectFit: 'cover', 
                            display: isLoading ? 'none' : 'block',
                            transition: 'transform 0.3s ease-in-out',
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
                        boxSizing: 'border-box',
                    }}>
                        <h4 style={{ 
                            margin: '5px 0', 
                            fontSize: '16px', 
                            color: 'white'  // 타이틀 색상 하얀색으로 변경
                        }}>
                            {movie.original_title}
                        </h4>
                        <p style={{
                            fontSize: '14px',
                            margin: '5px 0',
                            lineHeight: '1.3',
                            color: 'white',  // 장르 색상 하얀색으로 변경
                        }}>
                            {genres}  {/* 장르 출력 */}
                        </p>
                    </div>
                </Link>
            </div>
        </Col>
    );
}

export default GridCards;
