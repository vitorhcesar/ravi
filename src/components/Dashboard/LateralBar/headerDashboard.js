import MainContext from '@/contexts/mainContext'
import React, { useContext } from 'react'
import swal from 'sweetalert'
import styles from '@/styles/dashboard.module.css'

const HeaderDashboard = () => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD ] = useContext(MainContext);

    return (
        <header id='dashboardHeader' className={styles.header}>
            <div className={styles.logo}>
                <h1 className={styles.logoText}>RAVÍ</h1>
                <h2 className='normal text-blue'>Dashboard</h2>
                <button id='toggleBtn' onClick={() => toggleHeaderSD()}>
                    <ion-icon name="reorder-three-outline"></ion-icon>
                </button>
            </div>
            <div className={styles.totalSobraCtnr}>
                <div className={styles.totalDiv}>
                    <h2>Total</h2>
                    <div>
                        <h1><span>R$</span></h1>
                        <input value={valorGlobal} onChange={(e) => {
                            if(isNaN(e.target.value)){
                                swal('Valor inválido', 'O valor digitado não é um número!', 'error');
                            } else{
                                setValorGlobal(e.target.value);
                                localStorage.setItem('valorGlobal', JSON.stringify(e.target.value));
                            }
                        }} />
                    </div>
                </div>
                <div className={styles.sobraDiv}>
                    <h2>Sobra</h2>
                    <h1 id='db-sobraGlobal' className='db-sobraGlobalPositive'><b>R$ {sobraGlobal.toFixed(2)}</b></h1>
                </div>
            </div>
        </header>
    );
}

export default HeaderDashboard;