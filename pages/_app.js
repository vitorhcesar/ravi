import '@/styles/globals.css'
import Tabela from '@/src/components/Dashboard/TabelaView/tabela'
import { useState, useEffect } from 'react'
import MainContext from '@/contexts/mainContext'

import swal from 'sweetalert'


export default function App({ Component, pageProps }) {
    const [viewActive, setViewActive] = useState('tabelas');
    const [tabelas, setTabelas] = useState([{
            nome: 'Luz',
            total: 400,
            gasto: 0
        },
        {
            nome: 'Comida',
            total: 600,
            gasto: 100
        }
    ]);
    const [map, setMap] = useState(tabelas.map( (item, indice) => <Tabela key={indice} id={indice} name={item.nome} gasto={item.gasto} total={item.total} />));

    function refreshMap(){ // Função para atualizar o map na tela
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
        if(nome){

        }

        let total = parseFloat(prompt('Digite o valor teto da tabela'));
        let gasto = parseFloat(prompt('Digite o valor gasto da tabela'));

        tabelas.push({
            nome: nome,
            total: total,
            gasto: gasto
        });

        refreshMap();
        console.log('Nova Tabela adicionada', tabelas);
    }

    function removeTabela(index){
        tabelas.splice(index, 1);
        refreshMap();
    }

    function addRemoveTotalGasto(type, fnc, index){
        let value = null;
        
        if(type == 'total'){
            if(fnc == 'add'){
                value = parseFloat(prompt('Digite quanto você deseja adicionar: '));

                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } else if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                }

                tabelas[index].total += value;
            } else if(fnc == 'remove'){
                value = parseFloat(prompt('Digite quanto você deseja diminuir: '));
                
                if(value < 0){
                    alert('ERRO: Você não digitou um número positivo!');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    alert('ERRO: É necessário NÚMEROS para fazer a operação.');

                    return;
                } if(tabelas[index].total - value < 1){
                    alert('ERRO: O total não pode ser menor que 1.');

                    return;
                }

                tabelas[index].total -= value;
            }
        } else if(type == 'gasto') { // gasto
            if(fnc == 'add'){
                value = parseFloat(prompt('Digite quanto você deseja adicionar: '));
                
                if(value < 0){
                    alert('ERRO: Você não digitou um número positivo!');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    alert('ERRO: É necessário NÚMEROS para fazer a operação.');

                    return;
                } if(tabelas[index].gasto + value > tabelas[index].total){
                    alert('ERRO: O valor gasto não pode ser maior que o valor total.');

                    return;
                }

                tabelas[index].gasto += value;
            } else if(fnc == 'remove'){
                value = parseFloat(prompt('Digite quanto você deseja diminuir: '));
                
                if(value < 0){
                    alert('ERRO: Você não digitou um número positivo!');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    alert('ERRO: É necessário NÚMEROS para fazer a operação.');

                    return;
                } if(tabelas[index].gasto - value < 0){
                    alert('ERRO: O valor gasto não pode ser menor que 0.');

                    return;
                }

                tabelas[index].gasto -= value;
            }
        }

        refreshMap();
    }

    return (
        <MainContext.Provider value={[setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto]}>
            <Component {...pageProps} />
        </MainContext.Provider>
    );
}
