import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import './AuthPage.css';

const validateApiKey = async (apiKey) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`);
        return response.ok; // API 응답이 성공적이면 true 반환
    } catch (error) {
        console.error("API 키 검증 오류:", error);
        return false;
    }
};

const LoginPage = ({ switchToSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogin, setKeepLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.id === username);
    
        if (user && (await validateApiKey(password))) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', username); // username 저장
    
            if (keepLogin) {
                localStorage.setItem('keepLogin', 'true');
            }
    
            // 로그인 순서대로 userid 관리
            let loginOrder = JSON.parse(localStorage.getItem('loginOrder')) || [];
            let nextUserId = JSON.parse(localStorage.getItem('nextUserId')) || 1;
    
            if (!loginOrder.some((entry) => entry.username === username)) {
                loginOrder.push({ username, userid: nextUserId }); // username과 userid 저장
                localStorage.setItem('loginOrder', JSON.stringify(loginOrder));
                localStorage.setItem('nextUserId', nextUserId + 1); // 다음 userid 증가
            }
    
            setErrorMessage('');
            setSuccessMessage('로그인 성공!');
    
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
                window.location.reload();
            }, 2000);
        } else {
            setErrorMessage('계정이 존재하지 않거나 유효하지 않은 API 키입니다.');
        }
    };
    
    const handleKakaoSuccess = async (response) => {
        try {
            console.log('카카오 로그인 성공:', response);
    
            const { profile } = response;
            const username = profile?.kakao_account?.email || profile?.properties?.nickname;
    
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', username); // username 저장
            localStorage.setItem('kakaoProfile', JSON.stringify(profile));
    
            // 로그인 순서대로 userid 관리
            let loginOrder = JSON.parse(localStorage.getItem('loginOrder')) || [];
            let nextUserId = JSON.parse(localStorage.getItem('nextUserId')) || 1;
    
            if (!loginOrder.some((entry) => entry.username === username)) {
                loginOrder.push({ username, userid: nextUserId }); // username과 userid 저장
                localStorage.setItem('loginOrder', JSON.stringify(loginOrder));
                localStorage.setItem('nextUserId', nextUserId + 1); // 다음 userid 증가
            }
    
            setSuccessMessage('카카오 로그인 성공!');
            console.log('회원 정보:', profile);
    
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('카카오 로그인 처리 중 오류:', error);
            setErrorMessage('카카오 로그인 처리 중 문제가 발생했습니다.');
        }
    };
    
    const handleKakaoFailure = (error) => {
        console.error('카카오 로그인 실패:', error);
        setErrorMessage('카카오 로그인 중 오류가 발생했습니다.');
    };
    
    

    return (
        <div className="auth-page">
            <form onSubmit={handleLogin} className="auth-form">
                <h1>로그인</h1>
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
                    API 키
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

                {/* 카카오 로그인 버튼 */}
                <div className="kakao-login">
                    <KakaoLogin
                        token={process.env.REACT_APP_KAKAO_APP_KEY}
                        onSuccess={handleKakaoSuccess}
                        onFail={handleKakaoFailure}
                        render={({ onClick }) => (
                            <button onClick={onClick} className="kakao-login-btn">
                                카카오로 로그인
                            </button>
                        )}
                    />
                </div>
                <p onClick={switchToSignUp} className="switch-text">계정이 없으신가요? 회원가입</p>
            </form>

            {/* 성공 메시지 */}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default LoginPage;
