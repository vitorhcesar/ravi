import React, { useContext } from 'react'
import MainContext from '@/contexts/mainContext'; 

const Tabela = ( {id, name, gasto, total} ) => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto ] = useContext(MainContext);

    return (
        <div className='db-tabela'>
            <header>
                <ion-icon onClick={() => removeTabela(id)} name="trash-outline"></ion-icon>
                <h1>{name}</h1>
            </header>
            <div className='db-tableDiv'>
                <h2>Gasto <span>R$ {gasto}</span></h2>
                <div className='db-divBtns'>
                    <button onClick={() => addRemoveTotalGasto('gasto', 'remove', id)}>Diminuir</button>
                    <button onClick={() => addRemoveTotalGasto('gasto', 'add', id)}>Adicionar</button>
                </div>
            </div>
            <div className='db-tableDiv'>
                <h2>Total <span>R$ {total}</span></h2>
                <div className='db-divBtns'>
                    <button onClick={() => addRemoveTotalGasto('total', 'remove', id)}>Diminuir</button>
                    <button onClick={() => addRemoveTotalGasto('total', 'add', id)}>Adicionar</button>
                </div>
                <h2><b className='text-pink'>Sobram {tabelas[id].total - tabelas[id].gasto}</b></h2>
            </div>
        </div>
    )
};

export default Tabela