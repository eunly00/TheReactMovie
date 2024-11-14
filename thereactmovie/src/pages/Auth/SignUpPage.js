// src/pages/Auth/SignUpPage.js
import React, { useState } from 'react';
import './AuthPage.css';

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
        return true; // API 키가 유효하면 true 반환
    } catch (error) {
        console.error("API 키 검증 오류:", error);
        return false; // 오류 발생 시 false 반환
    }
};

const SignUpPage = ({ switchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        // 이메일 형식 검증
        if (!isEmailValid(username)) {
            setErrorMessage('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 약관 동의 확인
        if (!termsAccepted) {
            setErrorMessage('회원가입을 위해 약관에 동의해 주세요.');
            return;
        }

        // API 키 유효성 검증
        const isValidApiKey = await validateApiKey(password);
        if (!isValidApiKey) {
            setErrorMessage('유효한 TMDB API 키를 입력해주세요.');
            return;
        }

        // 저장된 유저 목록 가져오기
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // 이미 존재하는 계정 확인
        const userExists = users.some(user => user.id === username);
        if (userExists) {
            setErrorMessage('이미 존재하는 이메일입니다.');
            return;
        }

        // 새로운 사용자 추가 및 저장
        const newUser = { id: username, apiKey: password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setErrorMessage('');
        setSuccessMessage('회원가입 성공! 로그인해주세요.');

        // 일정 시간 후 로그인 화면으로 전환
        setTimeout(() => {
            setSuccessMessage('');
            switchToLogin();
        }, 2000);
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleSignUp} className="auth-form">
                <h1>회원가입</h1>
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
                    API 키 (비밀번호)
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    비밀번호 확인
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <label className="terms-checkbox">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    <span>필수 약관에 동의합니다.</span>
                </label>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="auth-button" disabled={!termsAccepted}>회원가입</button>
                <p onClick={switchToLogin} className="switch-text">이미 계정이 있으신가요? 로그인</p>
            </form>

            {/* 성공 메시지 표시 */}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default SignUpPage;
