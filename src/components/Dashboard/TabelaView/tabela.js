import React, { useContext } from 'react'
import MainContext from '@/contexts/mainContext'; 
import styles from '@/styles/dashboard.module.css'

const Tabela = ( {id, name, gasto, total} ) => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto ] = useContext(MainContext);

    return (
        <div className={styles.tabela}>
            <header>
                <ion-icon onClick={() => removeTabela(id)} name="trash-outline"></ion-icon>
                <h1>{name}</h1>
            </header>
            <div className={styles.tableDiv}>
                <h2>Gasto <span>R$ {gasto}</span></h2>
                <div>
                    <button onClick={() => addRemoveTotalGasto('gasto', 'remove', id)}>Diminuir</button>
                    <button onClick={() => addRemoveTotalGasto('gasto', 'add', id)}>Adicionar</button>
                </div>
            </div>
            <div className={styles.tableDiv}>
                <h2>Total <span>R$ {total}</span></h2>
                <div>
                    <button onClick={() => addRemoveTotalGasto('total', 'remove', id)}>Diminuir</button>
                    <button onClick={() => addRemoveTotalGasto('total', 'add', id)}>Adicionar</button>
                </div>
            </div>
            <h2 className='db-tableSobra'>Sobram <b className='text-pink'>R$ {total - gasto}</b></h2>
        </div>
    );
}

export default Tabela;