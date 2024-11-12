import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
    const placeholderImage = "https://via.placeholder.com/320x320?text=No+Image"; // 기본 이미지 URL

    return (
        <Col lg={4} md={6} sm={12} xs={24} style={{ padding: '10px' }}>
            <div style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: '10px', 
                backgroundColor: '#1e1e1e',
                color: 'white',
                textAlign: 'center',
            }}>
                <a href={`/movie/${props.movieId}`} >
                    <img
                        style={{ 
                            width: '100%', 
                            height: '270px', 
                            objectFit: 'cover', 
                            transition: 'transform 0.3s ease-in-out' 
                        }}
                        src={props.image || placeholderImage}
                        alt={props.movieName}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </a>
                {/* 영화 제목 및 장르 표시 영역 */}
                <div style={{
                    padding: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    <h4 style={{ margin: '5px 0', fontSize: '16px' }}>{props.movieName}</h4>
                    <p style={{ margin: '0', fontSize: '12px', color: '#ddd' }}>{props.genres}</p>
                </div>
            </div>
        </Col>
    );
}

export default GridCards;
