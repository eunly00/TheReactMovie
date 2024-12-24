// src/utils/tmdbApi.js
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // .env 파일에 TMDB API Key 저장

export const fetchMoviesByGenre = async (genreIds) => {
    try {
        const genreString = genreIds.join(","); // 장르 ID를 콤마로 연결
        const response = await fetch(
            `${API_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${genreString}&sort_by=popularity.desc`
        );
        const data = await response.json();
        return data.results; // 추천 영화 리스트 반환
    } catch (error) {
        console.error("TMDB API 호출 실패:", error);
        return [];
    }
};
