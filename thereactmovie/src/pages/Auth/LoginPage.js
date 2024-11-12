// src/pages/Auth/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ switchToSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogin, setKeepLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (storedUsername === username && storedPassword === password) {
            localStorage.setItem('isLoggedIn', keepLogin);
            setErrorMessage('');
            alert('로그인 성공!');
            navigate('/');
        } else {
            setErrorMessage(storedUsername !== username ? '해당 계정이 존재하지 않습니다.' : '비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <h1>로그인</h1>
            <label>
                아이디
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                비밀번호
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
    );
};

export default LoginPage;
