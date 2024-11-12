// src/services/TMDBService.js
import axios from 'axios';

const API_BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "ko-KR";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchFeaturedMovie = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
      },
    });
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching featured movie:', error);
    return null;
  }
};

export const getURLForPopularMovies = (page = 1) => {
  return `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
};

export const getURLForReleaseMovies = (page = 2) => {
  return `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
};

export const getURLForGenreMovies = (genre, page = 1) => {
  return `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=${LANGUAGE}&page=${page}`;
};

// 모든 함수들을 객체로 묶어서 default export
export default {
  fetchFeaturedMovie,
  getURLForPopularMovies,
  getURLForReleaseMovies,
  getURLForGenreMovies,
};
