import React, { useContext, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import MainContext from '@/contexts/mainContext';
import Tabela from './tabela';

const TabelaView = () => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas ] = useContext(MainContext);

    return (
        <section id='db-tabelaView' className='db-viewTabelaOn'>
            { map }
            <button onClick={() => addNewTabela()} className='db-newTableBtn'>
                Nova tabela
                <ion-icon name="add-circle-outline"></ion-icon>
            </button>
        </section>
    );
};

export default TabelaView;