import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaTicketAlt, FaSearch, FaBell, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-left">
                <div className="logo">
                    <Link to="/">
                        <FaTicketAlt size={24} color="white" />
                    </Link>
                </div>
                <nav className="nav-links desktop-nav">
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
                <button className="icon-button">
                    <FaUser color="white" />
                </button>
                <button className="icon-button mobile-menu-button" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes color="white" /> : <FaBars color="white" />}
                </button>
            </div>
            {isMobileMenuOpen && (
                <div className="mobile-nav open">
                    <button className="close-button" onClick={toggleMobileMenu}>
                        <FaTimes color="white" />
                    </button>
                    <nav>
                        <ul>
                            <li><Link to="/" onClick={toggleMobileMenu}>홈</Link></li>
                            <li><Link to="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</Link></li>
                            <li><Link to="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</Link></li>
                            <li><Link to="/search" onClick={toggleMobileMenu}>찾아보기</Link></li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
