import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import './AuthPage.css';

// AuthPage Component
const AuthPage = () => {
    const [isLoginPage, setIsLoginPage] = useState(true); // 현재 페이지 상태
    const [isTransitioning, setIsTransitioning] = useState(false); // 애니메이션 상태
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // 로그인 로직 (생략)
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // 회원가입 로직 (생략)
    };

    // 페이지 전환 함수
    const togglePage = () => {
        setIsTransitioning(true); // 애니메이션 시작
        setTimeout(() => {
            setIsLoginPage(!isLoginPage); // 페이지 변경
            setIsTransitioning(false); // 애니메이션 종료
        }, 500); // 애니메이션 지속 시간
    };

    return (
        <div className="auth-page">
            <div className={`auth-container ${isTransitioning ? 'transitioning' : ''}`}>
                {isLoginPage ? (
                    <div className="auth-form login-form">
                        <LoginPage
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                            switchToSignUp={togglePage}
                        />
                    </div>
                ) : (
                    <div className="auth-form signup-form">
                        <SignUpPage
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            handleSignUp={handleSignUp}
                            switchToLogin={togglePage}
                        />
                    </div>
                )}
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default AuthPage;
