import React, { useState } from 'react';
import './AuthPage.css';

const SignUpPage = ({ switchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        // 유효성 검사
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 저장된 유저 목록 가져오기
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // 이미 존재하는 계정 확인
        const userExists = users.some(user => user.id === username);
        if (userExists) {
            setErrorMessage('이미 존재하는 아이디입니다.');
            return;
        }

        if (!termsAccepted) {
            setErrorMessage('회원가입을 위해 약관에 동의해 주세요.');
            return;
        }

        // 새로운 사용자 추가 및 저장
        const newUser = { id: username, password: password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // 회원가입 성공 메시지 표시
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
