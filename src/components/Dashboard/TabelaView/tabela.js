import React from 'react'

const Tabela = ( {name, gasto, total} ) => {
    return (
        <div className='db-tabela'>
            <header>
                <ion-icon name="trash-outline"></ion-icon>
                <h1>Luz</h1>
            </header>
            <div className='db-tableDiv'>
                <h2>Gasto <span>R$ 0,00</span></h2>
                <div className='db-divBtns'>
                    <button>Diminuir</button>
                    <button>Adicionar</button>
                </div>
            </div>
            <div className='db-tableDiv'>
                <h2>Total <span>R$ 400,00</span></h2>
                <div className='db-divBtns'>
                    <button>Diminuir</button>
                    <button>Adicionar</button>
                </div>
            </div>
        </div>
    )
};

export default Tabela