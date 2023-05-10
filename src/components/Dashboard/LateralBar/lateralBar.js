import MainContext from '@/contexts/mainContext'
import React, { useContext } from 'react'

const LateralBar = () => {
    const [ setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal ] = useContext(MainContext);

    return (
        <div id='db-lateralBar'>
            <div className='db-logoCtner'>
                <h1 className='db-logoText'>RAVÍ</h1>
                <h2 className='db-dbText normal text-blue'>Dashboard</h2>
            </div>
            <div className='db-tSCtner'>
                <div className='db-totalInputDiv db-bgRounded bg-pink'>
                    <h1>Total: <span className='text-green'>R$</span></h1>
                    <input value={valorGlobal} onChange={(e) => setValorGlobal(e.target.value)} />
                </div>
                <div className='db-bgRounded bg-blue'>
                    <h1>Sobra: <b>R$ {sobraGlobal}</b></h1>
                </div>
            </div>
            <div className='db-lb-buttons'>
                <button onClick={() => setViewActive('tabelas')} className='db-lb-buttonSelected' id='btn-tabelas'>
                    <ion-icon name="albums-outline"></ion-icon>Tabelas
                </button>
                <button onClick={() => setViewActive('analytics')} className='db-lb-button' id='btn-analytics'>
                    <ion-icon name="bar-chart-outline"></ion-icon>Analytics
                </button>
            </div>
        </div>
    )
}

export default LateralBar