import '@/styles/globals.css';
import Tabela from '@/src/components/Dashboard/TabelaView/tabela';
import { useState, useEffect } from 'react';
import MainContext from '@/contexts/mainContext';


export default function App({ Component, pageProps }) {
    const [viewActive, setViewActive] = useState('tabelas');
    const [tabelas, setTabelas] = useState([{
            id: 0,
            nome: 'Luz',
            total: 400,
            gasto: 0
        },
        {
            id: 1,
            nome: 'Comida',
            total: 600,
            gasto: 100
        }
    ]);
    const [map, setMap] = useState(tabelas.map( (item, indice) => <Tabela key={indice} id={indice} name={item.nome} gasto={item.gasto} total={item.total} />));

    function refreshMap(){
        let newMap = tabelas.map( (item, indice) => <Tabela key={indice} id={indice} name={item.nome} gasto={item.gasto} total={item.total} />);
        setMap(newMap);
    }
    
    useEffect(() => {
        const tabelaView = document.getElementById('db-tabelaView');
        const analyticsView = document.getElementById('db-analyticsView');

        const btnTabelas = document.getElementById('btn-tabelas');
        const btnAnalytics = document.getElementById('btn-analytics');

        if(tabelaView){ // Se tabelaView EXISTE, então...
            if(viewActive == 'tabelas'){
                tabelaView.className = ('db-viewTabelaOn');
                analyticsView.className = ('db-viewAnalyticsOff')
                
                btnTabelas.className = ('db-lb-buttonSelected');
                btnAnalytics.className = ('db-lb-button');
            } else if(viewActive == 'analytics'){
                tabelaView.className = ('db-viewTabelaOff');
                analyticsView.className = ('db-viewAnalyticsOn')
                
                btnTabelas.className = ('db-lb-button');
                btnAnalytics.className = ('db-lb-buttonSelected');
            }
        }
        
        console.log('View mudada');
    }, [viewActive]);

    function addNewTabela(){
        let nome = prompt('Digite um nome para a tabela');
        let total = parseFloat(prompt('Digite o valor teto da tabela'));
        let gasto = parseFloat(prompt('Digite o valor gasto da tabela'));

        tabelas.push({
            id: (tabelas.length + 1),
            nome: nome,
            total: total,
            gasto: gasto
        });

        refreshMap();
        console.log('Nova Tabela adicionada', tabelas);
    }

    function removeTabela(index){
        
    }

    return (
        <MainContext.Provider value={[setViewActive, map, setMap, addNewTabela, tabelas, setTabelas]}>
            <Component {...pageProps} />
        </MainContext.Provider>
    );
}
