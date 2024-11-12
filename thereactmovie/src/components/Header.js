import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaSearch, FaBell, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 초기 로그인 상태 설정
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('username');
        setIsLoggedIn(loggedInStatus);
        setUsername(storedUsername || '');

        // storage 이벤트 리스너로 로그인 상태 유지
        const handleStorageChange = () => {
            const updatedStatus = localStorage.getItem('isLoggedIn') === 'true';
            const updatedUsername = localStorage.getItem('username');
            setIsLoggedIn(updatedStatus);
            setUsername(updatedUsername || '');
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            setIsLoggedIn(false);
            setUsername('');
            navigate('/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <Link to="/" className="logo">
                    <FaTicketAlt size={24} color="white" />
                </Link>
                <nav className="nav-links">
                    <ul>
                        <li><Link to="/">홈</Link></li>
                        <li><Link to="/popular">대세 콘텐츠</Link></li>
                        <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
                        <li><Link to="/search">찾아보기</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <button className="icon-button">
                    <FaSearch color="white" />
                </button>
                <button className="icon-button">
                    <FaBell color="white" />
                </button>
                <button className="icon-button" onClick={handleUserIconClick}>
                    {isLoggedIn ? (
                        <span className="username-display">{username}</span>
                    ) : (
                        <FaUser color="white" />
                    )}
                </button>
                <button className="icon-button">
                    <FaBars color="white" />
                </button>
            </div>
        </header>
    );
};

export default Header;
