import React, { useContext, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import MainContext from '@/contexts/mainContext';
import Tabela from './tabela';

const TabelaView = () => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas ] = useContext(MainContext);

    return (
        <section id='db-tabelaView' className='db-viewTabelaOn'>
            { map }
            <div className='db-divBtnsNewErase'>
                <button onClick={() => addNewTabela()} className='db-newTableBtn'>
                    Nova tabela
                    <ion-icon name="add-circle-outline"></ion-icon>
                </button>
                <button onClick={() => eraseTabelas()} className='db-newTableBtnErase'>
                    Excluir todas
                    <ion-icon name="trash-bin-outline"></ion-icon>
                </button>
            </div>
        </section>
    );
};

export default TabelaView;