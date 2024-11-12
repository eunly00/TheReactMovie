import React, { useEffect, useState, useRef } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import './Home.css';
import GridCards from '../../components/GridCards';

const HomePage = () => {
    const [sections, setSections] = useState([
        { title: '대세 콘텐츠', category: 'popular', movies: [], page: 1 },
        { title: '최신 콘텐츠', category: 'now_playing', movies: [], page: 1 },
        { title: '최고 평점 콘텐츠', category: 'top_rated', movies: [], page: 1 },
    ]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [genres, setGenres] = useState({}); // 장르 정보 저장
    const [recommendations, setRecommendations] = useState(() => {
        // 추천 영화 목록을 Local Storage에서 가져옴
        const savedRecommendations = localStorage.getItem('recommendations');
        return savedRecommendations ? JSON.parse(savedRecommendations) : [];
    });

    const scrollRefs = useRef(sections.map(() => React.createRef()));
    const recommendationsRef = useRef(null); // 추천 영화의 스크롤을 위한 참조

    useEffect(() => {
        const loadInitialMovies = async () => {
            await fetchGenres();
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

    // TMDB API에서 장르 목록을 가져와 장르 ID와 이름 매핑 객체를 생성
    const fetchGenres = async () => {
        const endpoint = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=ko-KR`;
        const response = await fetch(endpoint);
        const data = await response.json();
        const genresMap = {};
        data.genres.forEach((genre) => {
            genresMap[genre.id] = genre.name;
        });
        setGenres(genresMap);
    };

    // 영화 데이터를 가져오는 함수
    const fetchMovies = async (category, page) => {
        const endpoint = `${API_URL}movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.results.slice(0, 8);
    };

    // 추천 영화 목록에 추가 또는 제거하는 함수
    const toggleRecommendation = (movie) => {
        const updatedRecommendations = recommendations.some((m) => m.id === movie.id)
            ? recommendations.filter((m) => m.id !== movie.id) // 삭제
            : [...recommendations, movie]; // 추가

        setRecommendations(updatedRecommendations);
        localStorage.setItem('recommendations', JSON.stringify(updatedRecommendations)); // 로컬 스토리지에 저장
    };

    const scrollRecommendationsLeft = () => {
        recommendationsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRecommendationsRight = () => {
        recommendationsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
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
                        <p className="genres">
                            {featuredMovie.genre_ids.map((genreId) => genres[genreId]).join(', ')}
                        </p>
                        <button className="watch-button">바로보기</button>
                    </div>
                </div>
            )}

            {sections.map((section, index) => (
                <div key={index} className="content-section">
                    <h2>{section.title}</h2>
                    <div className="scroll-container">
                        <button className="scroll-button left" onClick={() => scrollRefs.current[index].current.scrollBy({ left: -300, behavior: 'smooth' })}>
                            &#10094;
                        </button>
                        <div className="content-row-container" ref={scrollRefs.current[index]}>
                            {section.movies.map((movie) => (
                                <GridCards
                                    key={movie.id}
                                    movie={movie}
                                    onClick={() => toggleRecommendation(movie)}
                                    isRecommended={recommendations.some((m) => m.id === movie.id)} // 추천된 영화인지 확인
                                    genres={movie.genre_ids.map((genreId) => genres[genreId]).join(', ')} // 장르 전달
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                />
                            ))}
                        </div>
                        <button className="scroll-button right" onClick={() => scrollRefs.current[index].current.scrollBy({ left: 300, behavior: 'smooth' })}>
                            &#10095;
                        </button>
                    </div>
                </div>
            ))}

            {/* 내가 찜한 콘텐츠 (추천 영화만) */}
            <div className="content-section">
                <h2>내가 찜한 콘텐츠</h2>
                <div className="scroll-container">
                    <button className="scroll-button left" onClick={scrollRecommendationsLeft}>
                        &#10094;
                    </button>
                    <div className="content-row-container" ref={recommendationsRef}>
                        {recommendations.map((movie) => (
                            <GridCards
                                key={movie.id}
                                movie={movie}
                                onClick={() => toggleRecommendation(movie)}
                                isRecommended={true} // 추천 영화 디자인을 다르게
                                genres={movie.genre_ids.map((genreId) => genres[genreId]).join(', ')}
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            />
                        ))}
                    </div>
                    <button className="scroll-button right" onClick={scrollRecommendationsRight}>
                        &#10095;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
