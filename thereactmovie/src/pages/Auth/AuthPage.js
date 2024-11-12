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
    const [keepLogin, setKeepLogin] = useState(false); // 로그인 유지 상태
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (storedUsername === username && storedPassword === password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            setErrorMessage('');
            setSuccessMessage('로그인 성공!');

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
                window.location.reload(); // 헤더에서 사용자 이름을 바로 반영하도록 새로고침
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

        if (localStorage.getItem('username') === username) {
            setErrorMessage('이미 존재하는 아이디입니다.');
            return;
        }

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setErrorMessage('');
        setSuccessMessage('회원가입 성공! 로그인해주세요.');
        setIsLoginPage(true); // 회원가입 후 로그인 페이지로 전환
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