// src/pages/Auth/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

// TMDB API 키를 유효성 검증하는 함수
const validateApiKey = async (apiKey) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`);
        return response.ok; // API 응답이 성공적이면 true 반환
    } catch (error) {
        console.error("API 키 검증 오류:", error);
        return false;
    }
};

const LoginPage = ({ switchToSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogin, setKeepLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // 저장된 모든 사용자 계정을 가져옴
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.id === username);

        // 사용자 계정 및 API 키 유효성 검증
        if (user && (await validateApiKey(password))) {
            // 로그인 성공 시 처리
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', username); // 현재 로그인한 사용자 저장
            if (keepLogin) {
                localStorage.setItem('keepLogin', 'true');
            }
            setErrorMessage('');
            setSuccessMessage('로그인 성공!');

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/'); // 메인 화면으로 이동
                window.location.reload();
            }, 2000); // 2초 후 성공 메시지 숨김
        } else {
            setErrorMessage('계정이 존재하지 않거나 유효하지 않은 API 키입니다.');
        }
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleLogin} className="auth-form">
                <h1>로그인</h1>
                <label>
                    이메일
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    API 키
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label className="keep-login">
                    <input
                        type="checkbox"
                        checked={keepLogin}
                        onChange={() => setKeepLogin(!keepLogin)}
                    />
                    로그인 유지
                </label>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="auth-button">로그인</button>
                <p onClick={switchToSignUp} className="switch-text">계정이 없으신가요? 회원가입</p>
            </form>

            {/* 성공 메시지 표시 */}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default LoginPage;
