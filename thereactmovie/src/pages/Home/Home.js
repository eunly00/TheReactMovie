import React, { useEffect, useState, useRef } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import './Home.css';
import GridCards from '../../components/GridCards';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// 모달 스타일 설정
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#181818',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

const HomePage = () => {
    const username = localStorage.getItem('loggedInUser'); // 현재 로그인한 사용자의 이름 가져오기
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 로그인 여부 확인
    const navigate = useNavigate();

    const [sections, setSections] = useState([
        { title: '대세 콘텐츠', category: 'popular', movies: [], page: 1 },
        { title: '최신 콘텐츠', category: 'now_playing', movies: [], page: 1 },
        { title: '최고 평점 콘텐츠', category: 'top_rated', movies: [], page: 1 },
    ]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [genres, setGenres] = useState({});
    const [recommendations, setRecommendations] = useState(() => {
        const savedRecommendations = localStorage.getItem(`${username}_recommendations`);
        return savedRecommendations ? JSON.parse(savedRecommendations) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const scrollRefs = useRef(sections.map(() => React.createRef()));
    const recommendationsRef = useRef(null);

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

    useEffect(() => {
        const savedRecommendations = localStorage.getItem(`${username}_recommendations`);
        setRecommendations(savedRecommendations ? JSON.parse(savedRecommendations) : []);
    }, [username]);

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

    const fetchMovies = async (category, page) => {
        const endpoint = `${API_URL}movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.results.slice(0, 8);
    };

    const toggleRecommendation = (movie) => {
        if (!isLoggedIn) {
            setIsModalOpen(true);
            return;
        }

        const updatedRecommendations = recommendations.some((m) => m.id === movie.id)
            ? recommendations.filter((m) => m.id !== movie.id)
            : [...recommendations, movie];

        setRecommendations(updatedRecommendations);
        localStorage.setItem(`${username}_recommendations`, JSON.stringify(updatedRecommendations));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const scrollRecommendationsLeft = () => {
        recommendationsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRecommendationsRight = () => {
        recommendationsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const navigateToMovieDetail = (movieId) => {
        navigate(`/movie/${movieId}`);
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
                        <button
                            className="watch-button"
                            onClick={() => navigateToMovieDetail(featuredMovie.id)}
                        >
                            자세히보기
                        </button>
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
                                    isRecommended={recommendations.some((m) => m.id === movie.id)}
                                    genres={movie.genre_ids.map((genreId) => genres[genreId]).join(', ')}
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
                                isRecommended={true}
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

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                ariaHideApp={false}
            >
                <h2>로그인이 필요합니다</h2>
                <p>추천 기능을 사용하려면 로그인이 필요합니다.</p>
                <button onClick={() => { closeModal(); navigate('/login'); }} className="modal-button">
                    로그인하기
                </button>
            </Modal>
        </div>
    );
};

export default HomePage;
