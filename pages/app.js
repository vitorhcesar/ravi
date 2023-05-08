import MainContext from '@/contexts/mainContext';
import AnalyticsView from '@/src/components/Dashboard/AnalyticsView/analyticsView';
import LateralBar from '@/src/components/Dashboard/LateralBar/lateralBar';
import TabelaView from '@/src/components/Dashboard/TabelaView/tabelaView';
import Head from 'next/head';
import { useState, useEffect } from 'react';

const App = () => {
    const [viewActive, setviewActive] = useState('tabelas');
    const [tabelas, setTabelas] = useState([
        {
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

    useEffect(() => {
        const tabelaView = document.getElementById('db-tabelaView');
        const analyticsView = document.getElementById('db-analyticsView');

        const btnTabelas = document.getElementById('btn-tabelas');
        const btnAnalytics = document.getElementById('btn-analytics');

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
    }, [viewActive]);

    function lbBtnClick(option){
        setviewActive(option);
    }

    return (
        <MainContext.Provider value={[setviewActive, lbBtnClick, tabelas, setTabelas]}>
            <div id='dashboard'>
                <Head>
                    <title>Dashboard | Raví</title>
                    <meta name="description" content="Desenvolvido por Vítor Hugo usando Next" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.svg" />
                </Head>
                <LateralBar />
                <TabelaView />
                <AnalyticsView />
            </div>
        </MainContext.Provider>
    )
}

export default App;