import MainContext from '@/contexts/mainContext';
import styles from '@/styles/loading.module.css'
import { useContext } from 'react';
import Spinner from './spinner';

export default function Loading(){
    const [ setViewActive, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD, editTableName, dashboardIsLoading, setDashboardIsLoading ] = useContext(MainContext);

    if(dashboardIsLoading){
        console.log('Carregando área da aplicação...', dashboardIsLoading);
        return (
            <div id='loader' className={styles.loaderOn}>
                <Spinner />
            </div>
        );
    } else if(!dashboardIsLoading) {
        console.log('Aplicação carregada!', dashboardIsLoading);
        return;
    }

}
