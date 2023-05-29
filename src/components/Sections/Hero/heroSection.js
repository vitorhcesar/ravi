import React from 'react'
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section id='hero'>
            <img id='money-icon' src='./money.png' alt='Icone de dinheiro' />
            <div id='hero-content'>
                <h1 className='text-blue normal'>Conheça a <b>Raví</b>🍃, seu organizador financeiro!</h1>
                <h2 className='normal text-black'>A Raví é um aplicação que trabalha com tabelas, onde você pode organizar seu dinheiro de forma dinâmica e intuitiva, e totalmente gratuita!</h2>
                <Link className='regular' id='app-button' href='/app'>Criar planilha</Link>
            </div>
        </section>
    );
}

export default HeroSection;