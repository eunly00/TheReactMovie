// src/components/Footer.js
import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

function Footer() {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem' }}>
            <p>Follow us on:</p>
            <div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub style={{ fontSize: '24px', marginRight: '10px' }} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter style={{ fontSize: '24px', marginRight: '10px' }} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
