// src/pages/Auth/AuthPage.js
import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import './AuthPage.css';

const AuthPage = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-container">
                {isLoginPage ? (
                    <LoginPage switchToSignUp={() => setIsLoginPage(false)} />
                ) : (
                    <SignUpPage switchToLogin={() => setIsLoginPage(true)} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
