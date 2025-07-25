import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

function Header() {
    const [hovered, setHovered] = useState(false);
    const cart = useSelector(state => state.cart.items);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    {/* Logo SVG copa de vino */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="logo-svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="40"
                        height="40"
                    >
                        <path d="M32 2C23 2 14 10 14 20c0 7 5 14 18 18 13-4 18-11 18-18 0-10-9-18-18-18z" fill="#800020" />
                        <line x1="32" y1="20" x2="32" y2="62" />
                        <line x1="20" y1="62" x2="44" y2="62" />
                    </svg>

                    <div className="logo-text">
                        <h3>Vinoteca El Roble</h3>
                        <small>Sabores que perduran</small>
                    </div>
                </div>

                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/products">Catálogo</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="cart-icon">
                <Link to="/cart" aria-label="Carrito de compras">
                    <div
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            transform: hovered ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            height="32"
                            width="32"
                            fill="none"
                            stroke={hovered ? '#FFD700' : '#5b0a0a'}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="5"
                            style={{
                                transition: 'stroke 0.3s ease',
                                color: '#FFD700',
                                display: 'block',
                            }}
                        >
                            <circle cx="80" cy="216" r="12" fill="none" stroke="currentColor" />
                            <circle cx="184" cy="216" r="12" fill="none" stroke="currentColor" />
                            <path
                                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                fill="none"
                                stroke="currentColor"
                            />
                        </svg>

                        {totalQuantity > 0 && (
                            <span className="cart-count">{totalQuantity}</span>
                        )}
                    </div>
                </Link>
            </div>


            
        </header>
    );
}

export default Header;
