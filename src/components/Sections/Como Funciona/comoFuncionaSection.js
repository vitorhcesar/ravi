import React from 'react'

const ComoFuncionaSection = () => {
    return (
        <section id='como-funciona-section'>
            <div className='section-title to-left'>
                <span className='green-block'></span>
                <span className='pink-block'></span>
                <h1 className='normal'>Como funciona</h1>
            </div>
            <div id='como-funciona-content'>
                <p className='regular'>O app funciona com base em colunas, então basta colocar o valor total do quanto você está organizando, e organizar as colunas com os valores que você deseja para cada orçamento. (Uber, comida, etc)</p>
                <img src='columns.png' />
            </div>
        </section>
    )
}

export default ComoFuncionaSection