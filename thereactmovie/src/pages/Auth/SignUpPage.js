// src/pages/Auth/SignUpPage.js
import React, { useState } from 'react';

const SignUpPage = ({ switchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
        alert('회원가입 성공!');
        switchToLogin();
    };

    return (
        <form onSubmit={handleSignUp} className="auth-form">
            <h1>회원가입</h1>
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
            <label>
                비밀번호 확인
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" className="auth-button">회원가입</button>
            <p onClick={switchToLogin} className="switch-text">이미 계정이 있으신가요? 로그인</p>
        </form>
    );
};

export default SignUpPage;
