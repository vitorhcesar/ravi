import React, { useContext } from 'react'
import MainContext from '@/contexts/mainContext'; 
import styles from '@/styles/dashboard.module.css'

const Tabela = ( {id, name, gasto, total} ) => {
    const [ setViewActive, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD, editTableName ] = useContext(MainContext);

    return (
        <div className={styles.tabela}>
            <header>
                <ion-icon onClick={() => removeTabela(id)} name="trash"></ion-icon>
                <h1>
                    {name}
                    <ion-icon onClick={() => editTableName(id)} name="create"></ion-icon>
                </h1>
            </header>
            <div className={styles.tableDiv}>
                <h2><span>R$ {gasto.toFixed(2)}</span> / <span>R$ {total.toFixed(2)}</span></h2>
                <div>
                    <button onClick={() => addRemoveTotalGasto('gasto', id)}>Mudar gasto</button>
                    <button onClick={() => addRemoveTotalGasto('total', id)}>Mudar total</button>
                </div>
            </div>
            {/* <div className={styles.tableDiv}>
                <h2>Total <span>R$ {total.toFixed(2)}</span></h2>
                <div>
                    <button onClick={() => addRemoveTotalGasto('total', 'remove', id)}>Diminuir</button>
                    <button onClick={() => addRemoveTotalGasto('total', 'add', id)}>Adicionar</button>
                </div>
            </div> */}
            <h2 className='db-tableSobra'>Sobram <b className='text-pink'>R$ {(total - gasto).toFixed(2)}</b></h2>
        </div>
    );
}

export default Tabela;