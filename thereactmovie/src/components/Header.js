import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaSearch, FaBell, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('loggedInUser'); // 'loggedInUser' 사용
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
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                <button className="icon-button" onClick={toggleSidebar}>
                    {isSidebarOpen ? <FaTimes color="white" /> : <FaBars color="white" />}
                </button>
            </div>

            {/* Sidebar 메뉴 */}
            {isSidebarOpen && (
                <div className="sidebar">
                    <button className="close-sidebar" onClick={toggleSidebar}>
                        <FaTimes color="white" />
                    </button>
                    <ul className="sidebar-menu">
                        <li><Link to="/" onClick={toggleSidebar}>홈</Link></li>
                        <li><Link to="/popular" onClick={toggleSidebar}>대세 콘텐츠</Link></li>
                        <li><Link to="/wishlist" onClick={toggleSidebar}>내가 찜한 리스트</Link></li>
                        <li><Link to="/search" onClick={toggleSidebar}>찾아보기</Link></li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
