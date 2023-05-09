import React, { useContext } from 'react'
import MainContext from '@/contexts/mainContext'; 

const Tabela = ( {id, name, gasto, total} ) => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas ] = useContext(MainContext);

    return (
        <div className='db-tabela'>
            <header>
                <ion-icon name="trash-outline"></ion-icon>
                <h1>{name}</h1>
            </header>
            <div className='db-tableDiv'>
                <h2>Gasto <span>R$ {gasto}</span></h2>
                <div className='db-divBtns'>
                    <button>Diminuir</button>
                    <button>Adicionar</button>
                </div>
            </div>
            <div className='db-tableDiv'>
                <h2>Total <span>R$ {total}</span></h2>
                <div className='db-divBtns'>
                    <button>Diminuir</button>
                    <button>Adicionar</button>
                </div>
            </div>
        </div>
    )
};

export default Tabela