import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import './AuthPage.css';

const AuthPage = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [keepLogin, setKeepLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        // 계정별로 key 값을 다르게 설정하여 로그인 상태와 추천 목록을 관리
        const isLoggedInKey = `${username}_isLoggedIn`;
        const recommendationsKey = `${username}_recommendations`;

        if (storedUsername === username && storedPassword === password) {
            localStorage.setItem(isLoggedInKey, 'true');
            localStorage.setItem('username', username); // 현재 로그인된 사용자 이름 저장
            setErrorMessage('');
            setSuccessMessage('로그인 성공!');

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
                window.location.reload(); // 헤더에 사용자 이름을 즉시 반영하기 위해 새로고침
            }, 2000);
        } else {
            setErrorMessage(storedUsername !== username ? '해당 계정이 존재하지 않습니다.' : '비밀번호가 일치하지 않습니다.');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 계정별로 key 값을 다르게 설정
        const isLoggedInKey = `${username}_isLoggedIn`;
        const recommendationsKey = `${username}_recommendations`;

        if (localStorage.getItem('username') === username) {
            setErrorMessage('이미 존재하는 아이디입니다.');
            return;
        }

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem(isLoggedInKey, 'false'); // 처음에는 로그아웃 상태로 저장
        localStorage.setItem(recommendationsKey, JSON.stringify([])); // 빈 추천 리스트로 초기화
        setErrorMessage('');
        alert('회원가입 성공! 로그인해주세요.');
        setIsLoginPage(true);
    };

    return (
        <div className="auth-page">
            {isLoginPage ? (
                <LoginPage
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    keepLogin={keepLogin}
                    setKeepLogin={setKeepLogin}
                    handleLogin={handleLogin}
                    switchToSignUp={() => setIsLoginPage(false)}
                />
            ) : (
                <SignUpPage
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
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
