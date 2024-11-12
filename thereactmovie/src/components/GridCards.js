import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
    const placeholderImage = "https://via.placeholder.com/320x320?text=No+Image"; // 기본 이미지 URL

    if (props.landingPage) {
        return (
            <Col lg={4} md={6} sm={12} xs={24} style={{ padding: '10px' }}>
                <div style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    borderRadius: '10px', 
                    backgroundColor: '#1e1e1e' 
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
                </div>
            </Col>
        );
    } else {
        return (
            <Col lg={4} md={6} sm={12} xs={24} style={{ padding: '10px' }}>
                <div style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    borderRadius: '10px', 
                    backgroundColor: '#1e1e1e' 
                }}>
                    <img
                        style={{ 
                            width: '100%', 
                            height: '270px', 
                            objectFit: 'cover', 
                            transition: 'transform 0.3s ease-in-out' 
                        }}
                        src={props.image || placeholderImage}
                        alt={props.characterName}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </div>
            </Col>
        );
    }
}

export default GridCards;
