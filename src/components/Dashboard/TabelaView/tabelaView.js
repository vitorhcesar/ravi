import React, { useContext, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import MainContext from '@/contexts/mainContext';
import styles from '@/styles/dashboard.module.css'

const TabelaView = () => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas ] = useContext(MainContext);

    return (
        <section id='db-tabelaView' className='db-viewTabelaOn'>
            { map }
            <div className={styles.btnsNewEraseDiv}>
                <button onClick={() => addNewTabela()} className={styles.newTableBtn}>
                    Nova tabela
                    <ion-icon name="add-circle-outline"></ion-icon>
                </button>
                <button onClick={() => eraseTabelas()} className={styles.eraseTableBtn}>
                    Excluir todas
                    <ion-icon name="trash-bin-outline"></ion-icon>
                </button>
            </div>
        </section>
    );
};

export default TabelaView;