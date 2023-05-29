import MainContext from '@/contexts/mainContext'
import React, { useContext } from 'react'
import styles from '@/styles/dashboard.module.css'

const ButtonsView = () => {
    const [ setViewActive, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal ] = useContext(MainContext);

    return (
        <div className={styles.buttonsDiv}>
            <button onClick={() => setViewActive('tabelas')} className='db-lb-buttonSelected' id='btn-tabelas'>
                <ion-icon name="albums-outline"></ion-icon>
                <p>Tabelas</p>
            </button>
            <button onClick={() => setViewActive('analytics')} className='db-lb-button' id='btn-analytics'>
                <ion-icon name="bar-chart-outline"></ion-icon>
                <p>Analytics</p>
            </button>
        </div>
    )
}

export default ButtonsView