import React, { useEffect, useState, useRef } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import './Home.css';
import GridCards from '../../components/GridCards';

const HomePage = () => {
    const [sections, setSections] = useState([
        { title: '대세 콘텐츠', category: 'popular', movies: [], page: 1 },
        { title: '최신 콘텐츠', category: 'now_playing', movies: [], page: 1 },
        { title: '최고 평점 콘텐츠', category: 'top_rated', movies: [], page: 1 },
        { title: '내가 찜한 콘텐츠', category: 'upcoming', movies: [], page: 1 }
    ]);
    const [featuredMovie, setFeaturedMovie] = useState(null);

    // 각 섹션의 수평 스크롤을 제어할 수 있도록 useRef 배열 생성
    const scrollRefs = useRef(sections.map(() => React.createRef()));

    useEffect(() => {
        const loadInitialMovies = async () => {
            const popularMovies = await fetchMovies('popular', 1);
            setFeaturedMovie(popularMovies[Math.floor(Math.random() * popularMovies.length)]);

            const updatedSections = await Promise.all(
                sections.map(async (section) => {
                    const movies = await fetchMovies(section.category, section.page);
                    return { ...section, movies };
                })
            );
            setSections(updatedSections);
        };

        loadInitialMovies();
    }, []);

    const fetchMovies = async (category, page) => {
        const endpoint = `${API_URL}movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.results.slice(0, 8);
    };

    const scrollLeft = (index) => {
        scrollRefs.current[index].current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = (index) => {
        scrollRefs.current[index].current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="home">
            {featuredMovie && (
                <div 
                    className="banner" 
                    style={{ backgroundImage: `url(${IMAGE_BASE_URL}w1280${featuredMovie.backdrop_path})` }}
                >
                    <div className="banner-content">
                        <h1>{featuredMovie.original_title}</h1>
                        <p>{featuredMovie.overview}</p>
                        <button className="watch-button">바로보기</button>
                    </div>
                </div>
            )}

            {sections.map((section, index) => (
                <div key={index} className="content-section">
                    <h2>{section.title}</h2>
                    <div className="scroll-container">
                        <button className="scroll-button left" onClick={() => scrollLeft(index)}>
                            &#10094;
                        </button>
                        <div className="content-row-container" ref={scrollRefs.current[index]}>
                            {section.movies.map((movie) => (
                                <GridCards
                                    key={movie.id}
                                    landingPage
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                />
                            ))}
                        </div>
                        <button className="scroll-button right" onClick={() => scrollRight(index)}>
                            &#10095;
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
