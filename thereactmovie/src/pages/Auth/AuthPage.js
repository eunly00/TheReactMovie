import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import './AuthPage.css';

// 로그인 함수
function tryLogin(email, password, success, fail) {
    const users = JSON.parse(localStorage.getItem('users')) || []; // 최신 users 배열 불러오기
    const user = users.find(user => user.id === email && user.password === password);
    if (user) {
        localStorage.setItem('TMDb-Key', user.password); // API 키 저장
        success(user);
    } else {
        fail('로그인 정보가 올바르지 않습니다.');
    }
}

// 회원가입 함수
function tryRegister(email, password, success, fail) {
    const users = JSON.parse(localStorage.getItem('users')) || []; // 최신 users 배열 불러오기
    const userExists = users.some(existingUser => existingUser.id === email);

    if (!userExists) {
        const newUser = { id: email, password: password };
        users.push(newUser); // 새로운 사용자 추가
        localStorage.setItem('users', JSON.stringify(users)); // 업데이트된 사용자 배열 저장
        success(newUser);
    } else {
        fail('이미 존재하는 이메일입니다.');
    }
}

const AuthPage = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // 로그인 처리
    const handleLogin = (e) => {
        e.preventDefault();
        tryLogin(
            username,
            password,
            (user) => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', user.id);
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

    // 회원가입 처리
    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        tryRegister(
            username,
            password,
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
