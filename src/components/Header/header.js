import React from 'react'
import Link from 'next/link';

const Header = () => {
    const handleClickScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header>
            <img src='./logo-black.png' alt='logo Raví' />
            <nav>
                <button onClick={() => handleClickScroll('project-section')} className='nav-item'>O projeto</button>
                <button onClick={() => handleClickScroll('como-funciona-section')} className='nav-item'>Como funciona</button>
                <button onClick={() => handleClickScroll('suporte-section')} className='nav-item'>Suporte-nos</button>
            </nav>
        </header>
    )
}

export default Header;