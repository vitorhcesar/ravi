import MainContext from '@/contexts/mainContext'
import React, { useContext, useEffect, useState } from 'react'
import BarChart from '../../Charts/barChart';
import styles from '@/styles/dashboard.module.css'
import PieChart from '../../Charts/pieChart';

const AnalyticsView = () => {
    const [setViewActive, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD, editTableName, dashboardIsLoading, setDashboardIsLoading] = useContext(MainContext);

    const [tablesDataGasto, settablesDataGasto] = useState({
        labels: tabelas.map((data) => data.nome),
        datasets: [{
            label: 'Total gasto',
            data: tabelas.map((data) => data.gasto)
        }]
    });
    const [tablesDataTotal, settablesDataTotal] = useState({
        labels: tabelas.map((data) => data.nome),
        datasets: [{
            label: 'Total',
            data: tabelas.map((data) => data.total)
        }]
    });
    const [tablesDataSobra, settablesDataSobra] = useState({
        labels: tabelas.map((data) => data.nome),
        datasets: [{
            label: 'Sobra',
            data: tabelas.map((data) => (data.total - data.gasto))
        }]
    });

    useEffect(() => {
        let refreshedTableDataGasto = {
            labels: tabelas.map((data) => data.nome),
            datasets: [{
                label: 'Valor gasto',
                data: tabelas.map((data) => data.gasto)
            }]
        };

        let refreshedTableDataTotal = {
            labels: tabelas.map((data) => data.nome),
            datasets: [{
                label: 'Total',
                data: tabelas.map((data) => data.total)
            }]
        };

        let refreshedTableDataSobra = {
            labels: tabelas.map((data) => data.nome),
            datasets: [{
                label: 'Sobra',
                data: tabelas.map((data) => (data.total - data.gasto))
            }]
        };

        settablesDataGasto(refreshedTableDataGasto);
        settablesDataTotal(refreshedTableDataTotal);
        settablesDataSobra(refreshedTableDataSobra);

        checkValorGasto();
    }, [tabelas]);

    function checkValorGasto(){
        let gasto = 0;
        let array = tabelas.map((e) => {
            gasto += e.gasto;
        });

        // console.log('Valor gasto: ', gasto);

        if(gasto > 0){
            // console.log('Gasto é maior que zero!');
            return true;
        } else{
            // console.log('Gasto é menor que zero!');
            return false;
        }
    }


    if(tabelas.length > 0){
        return (
            <section id='db-analyticsView' className='db-viewAnalyticsOff'>
                <div className={styles.analytics}>
                    <div className={styles.divCtner}>
                        <div>
                            <h1>Valor gasto nas Tabelas</h1>
                            
                            {checkValorGasto() ? <BarChart chartData={tablesDataGasto} /> : <h3>Você ainda não gastou dinheiro nas tabelas.</h3>}
                        </div>
                        <div>
                            <h1>Total das tabelas</h1>
                            <BarChart chartData={tablesDataTotal} />
                        </div>
                    </div>
                    <div>
                        <h1>Sobra das tabelas</h1>
                        <PieChart chartData={tablesDataSobra} />
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section id='db-analyticsView' className='db-viewAnalyticsOff'>
                <div>
                    <h1>Não existem tabelas, crie uma!</h1>
                </div>
            </section>
        );
    }
}

export default AnalyticsView