import React from 'react'

const SuporteSection = () => {
    return (
        <section id='suporte-section'>
            <div className='section-title to-right'>
                <h1>Suporte-nos</h1>
                <span className='green-block'></span>
                <span className='pink-block'></span>
            </div>
            <div id='suporte-content'>
                <div id='panel' className='bg-blue'>
                    <p className='text-white regular'>Foi uma honra desenvolver este projeto. Este foi feito sem nenhum fim lucrativo.</p>
                    <br/>
                    <p className='text-white regular'>Porém, caso seja do seu interesse, você pode me ajudar muito <b>fazendo uma doação!</b></p>
                </div>
                <div id='pix-area'>
                    <div>
                        <img src='pix-qr-code.png' />
                    </div>
                    <div id='pix-info-text'>
                        <h1 className='normal text-black'>Vítor Hugo Tavares Pereira</h1>
                        <h2 className='regular text-white'>Chave aleatória:</h2>
                        <h3 className='normal text-white'>204f5420-7a1b-4cc6-8ab6-1dcbb00fd3a2</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SuporteSection