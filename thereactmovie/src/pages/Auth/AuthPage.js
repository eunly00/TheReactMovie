// src/pages/Auth/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import './AuthPage.css';

// 로컬 스토리지에서 사용자 계정 정보 불러오기
let users = JSON.parse(localStorage.getItem('users')) || [];

// 이메일 형식 검증 함수
const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// TMDB API 키 유효성 검증 함수
const validateApiKey = async (apiKey) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error('유효하지 않은 API 키입니다.');
        }
        return true;
    } catch (error) {
        console.error("API 키 검증 오류:", error);
        return false;
    }
};

// 로그인 함수
function tryLogin(email, password, success, fail) {
    const user = users.find(user => user.id === email && user.apiKey === password);
    if (user) {
        localStorage.setItem('TMDb-Key', user.apiKey);
        success(user);
    } else {
        fail('로그인 정보가 올바르지 않습니다.');
    }
}

// 회원가입 함수
async function tryRegister(email, apiKey, success, fail) {
    if (!isEmailValid(email)) {
        return fail('이메일 형식이 올바르지 않습니다.');
    }
    
    const userExists = users.some(existingUser => existingUser.id === email);
    if (userExists) {
        return fail('이미 존재하는 이메일입니다.');
    }

    // API 키 유효성 검증
    const isValidApiKey = await validateApiKey(apiKey);
    if (!isValidApiKey) {
        return fail('유효한 TMDB API 키를 입력해주세요.');
    }

    const newUser = { id: email, apiKey };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // 업데이트된 사용자 배열 저장
    success(newUser);
}

const AuthPage = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        tryLogin(
            username,
            password,
            (user) => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInUser', user.id);
                setErrorMessage('');
                setSuccessMessage('로그인 성공!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                    window.location.reload();
                }, 2000);
            },
            (message) => setErrorMessage(message)
        );
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        tryRegister(
            username,
            password, // 회원가입 시 사용자가 제공한 API 키를 비밀번호로 사용
            (newUser) => {
                setErrorMessage('');
                setSuccessMessage('회원가입 성공! 로그인해주세요.');
                setTimeout(() => {
                    setIsLoginPage(true);
                    setSuccessMessage('');
                }, 2000);
            },
            (message) => setErrorMessage(message)
        );
    };

    return (
        <div className="auth-page">
            {isLoginPage ? (
                <LoginPage
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    switchToSignUp={() => setIsLoginPage(false)}
                />
            ) : (
                <SignUpPage
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleSignUp={handleSignUp}
                    switchToLogin={() => setIsLoginPage(true)}
                />
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default AuthPage;
