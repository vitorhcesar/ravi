import React, { useContext } from 'react'
import Tabela from './tabela';
import MainContext from '@/contexts/mainContext';

const TabelaView = () => {
    const [ tabelas ] = useContext(MainContext);

    console.log(tabelas);

    return (
        <section id='db-tabelaView' className='db-viewTabelaOn'>
            {/* { tabelas.map( (item, indice) => <Tabela key={indice} name={item.nome} gasto={item.gasto} total={item.total} />) } */}
            <Tabela />
            <button className='db-newTableBtn'>Nova tabela<ion-icon name="add-circle-outline"></ion-icon></button>
        </section>
    );
};

export default TabelaView;