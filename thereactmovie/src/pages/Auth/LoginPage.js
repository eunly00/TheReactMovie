// src/pages/Auth/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const LoginPage = ({ switchToSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogin, setKeepLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // 저장된 모든 사용자 계정을 가져옴
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.id === username && user.password === password);

        if (user) {
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
            setErrorMessage('해당 계정이 존재하지 않거나 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className="auth-page">
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

            {/* 성공 메시지 표시 */}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default LoginPage;
