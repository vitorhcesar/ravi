import React from 'react'
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section id='hero'>
            <img id='money-icon' src='./money.png' alt='Icone de dinheiro' />
            <div id='hero-content'>
                <h2 className='normal text-black'>Cansado de fazer as mesmas contas e organizar onde cada parte do seu dinheiro está indo?</h2>
                <h1 className='text-blue normal'>Conheça a <b>Raví</b></h1>
                <Link className='regular' id='app-button' href='/app'>Criar planilha</Link>
            </div>
        </section>
    );
}

export default HeroSection;