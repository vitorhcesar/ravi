import AnalyticsView from '@/src/components/Dashboard/AnalyticsView/analyticsView';
import HeaderDashboard from '@/src/components/Dashboard/LateralBar/headerDashboard';
import TabelaView from '@/src/components/Dashboard/TabelaView/tabelaView';
import Head from 'next/head';
import styles from '@/styles/dashboard.module.css'
import ButtonsView from '@/src/components/Dashboard/LateralBar/buttonsView';
import { useContext, useEffect } from 'react';
import MainContext from '@/contexts/mainContext';
import Loading from '@/src/components/Loading/loading';

const App = () => {
    const [ setViewActive, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD, editTableName, dashboardIsLoading, setDashboardIsLoading ] = useContext(MainContext);

    useEffect(() => {
        setDashboardIsLoading(false);
        // console.log('App inicializado: ', dashboardIsLoading);
    }, []);

    return (
        <div id='dashboard' className={styles.dashboard}>
            <Head>
                <title>Dashboard | Raví</title>
                <meta name="description" content="Desenvolvido por Vítor Hugo usando Next" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <HeaderDashboard />
            <div className={styles.screen}>
                <ButtonsView />
                <Loading />
                <TabelaView />
                <AnalyticsView />
            </div>
        </div>
    )
}

export default App;