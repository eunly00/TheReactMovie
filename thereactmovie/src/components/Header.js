import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSearch, FaBell } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태 관리
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const [username, setUsername] = useState(''); // 로그인된 사용자 이름
    const navigate = useNavigate();

    // 스크롤 이벤트 리스너 추가
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // 스크롤 위치에 따라 상태 업데이트
        };
        window.addEventListener('scroll', handleScroll);

        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('loggedInUser');
        setIsLoggedIn(loggedInStatus);
        setUsername(storedUsername || '');

        const handleStorageChange = () => {
            const updatedStatus = localStorage.getItem('isLoggedIn') === 'true';
            const updatedUsername = localStorage.getItem('loggedInUser');
            setIsLoggedIn(updatedStatus);
            setUsername(updatedUsername || '');
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser');
            setIsLoggedIn(false);
            setUsername('');
            navigate('/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-left">
                <Link to="/" className="logo">LOGO</Link>
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
                <button className="icon-button"><FaSearch /></button>
                <button className="icon-button"><FaBell /></button>
                <button className="icon-button" onClick={handleUserIconClick}>
                    {isLoggedIn ? <span className="username-display">{username}</span> : <FaUser />}
                </button>
                <button className="icon-button" onClick={toggleSidebar}>
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-sidebar" onClick={toggleSidebar}><FaTimes /></button>
                <ul className="sidebar-menu">
                    <li><Link to="/" onClick={toggleSidebar}>홈</Link></li>
                    <li><Link to="/popular" onClick={toggleSidebar}>대세 콘텐츠</Link></li>
                    <li><Link to="/wishlist" onClick={toggleSidebar}>내가 찜한 리스트</Link></li>
                    <li><Link to="/search" onClick={toggleSidebar}>찾아보기</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
