import React, { useContext, useEffect } from 'react';
import MainContext from '@/contexts/mainContext';
import styles from '@/styles/dashboard.module.css'
import Tabela from './tabela';

const TabelaView = () => {
    const [ setViewActive, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD, editTableName, dashboardIsLoading, setDashboardIsLoading, refreshDashboard ] = useContext(MainContext);

    return (
        <section id='db-tabelaView' className='db-viewTabelaOn'>
            { tabelas.map( (item, indice) => <Tabela key={indice} id={indice} name={item.nome} gasto={item.gasto} total={item.total} />) }
            <div className={styles.btnsNewEraseDiv}>
                <button onClick={() => addNewTabela()} className={styles.newTableBtn}>
                    Nova tabela
                    <ion-icon name="add-circle"></ion-icon>
                </button>
                <button onClick={() => refreshDashboard()} className={styles.refreshDashboardBtn}>
                    Atualizar Dashboard
                    <ion-icon name="refresh-circle"></ion-icon>
                </button>
                <button onClick={() => eraseTabelas()} className={styles.eraseTableBtn}>
                    Excluir todas
                    <ion-icon name="trash-bin"></ion-icon>
                </button>
            </div>
        </section>
    );
};

export default TabelaView;