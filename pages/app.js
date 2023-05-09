import AnalyticsView from '@/src/components/Dashboard/AnalyticsView/analyticsView';
import LateralBar from '@/src/components/Dashboard/LateralBar/lateralBar';
import TabelaView from '@/src/components/Dashboard/TabelaView/tabelaView';
import Head from 'next/head';

const App = () => {
    return (
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
    )
}

export default App;