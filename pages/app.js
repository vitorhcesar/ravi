import AnalyticsView from '@/src/components/Dashboard/AnalyticsView/analyticsView';
import HeaderDashboard from '@/src/components/Dashboard/LateralBar/headerDashboard';
import TabelaView from '@/src/components/Dashboard/TabelaView/tabelaView';
import Head from 'next/head';
import styles from '@/styles/dashboard.module.css'
import ButtonsView from '@/src/components/Dashboard/LateralBar/buttonsView';
import Loading from '@/src/components/Loading/loading';

const App = () => {
    return (
        <div id='dashboard' className={styles.dashboard}>
            <Head>
                <title>Dashboard | Raví</title>
                <meta name="description" content="Desenvolvido por Vítor Hugo usando Next" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Loading />
            <HeaderDashboard />
            <div className={styles.screen}>
                <ButtonsView />
                <TabelaView />
                <AnalyticsView />
            </div>
        </div>
    )
}

export default App;