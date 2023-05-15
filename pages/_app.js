import '@/styles/globals.css'
import Tabela from '@/src/components/Dashboard/TabelaView/tabela'
import React, { useState, useEffect } from 'react'
import MainContext from '@/contexts/mainContext'
import swal from 'sweetalert'
import styles from '@/styles/dashboard.module.css'

export default function App({ Component, pageProps }) {
    // Variáveis e estados
    const [viewActive, setViewActive] = useState('tabelas');
    const [tabelas, setTabelas] = useState([{
        nome: 'Transporte',
        total: 400,
        gasto: 0
    }, {
        nome: 'Comida',
        total: 600,
        gasto: 200
    }]);
    const [map, setMap] = useState(tabelas.map( (item, indice) => <Tabela key={indice} id={indice} name={item.nome} gasto={item.gasto} total={item.total} />));
    const [valorGlobal, setValorGlobal] = useState(1000);
    const [sobraGlobal, setSobraGlobal] = useState(0);

    // Funções
    function refreshMap(){ // Função para atualizar o map na tela
        if(tabelas.length > 0){
            let newMap =  tabelas.map( (item, indice) => <Tabela key={indice} id={indice} name={item.nome} gasto={item.gasto} total={item.total} />);
            setMap(newMap);
            console.log('Map refresh');
        } else {
            setMap('Nenhuma tabela na área de trabalho.')
        }
    }

    async function sobraGlobalCounter(){
        if(document.getElementById('dashboard')!== null){
            let tabelasValue = 0;
            let sobraObject = document.getElementById('db-sobraGlobal');
            
            for(var i = 0; i < tabelas.length; i++){
                tabelasValue = tabelasValue + parseFloat(tabelas[i].total);
            }
            
            setSobraGlobal(valorGlobal - tabelasValue);
    
            if((valorGlobal - tabelasValue) < 0){
                sobraObject.className = 'db-sobraGlobalNegative';
            } else{
                sobraObject.className = 'db-sobraGlobalPositive';
            }
        }
    }

    async function eraseTabelas(){
        if(tabelas.length == 0){
            swal('Você já não possui tabelas!', 'A área de trabalho não possui nenhuma tabela!', 'error', {
                button: 'Vou criar uma!'
            });
        } else {
            await swal('Esta ação é importante', 'Você tem certeza de que quer excluir todas as tabelas?', 'warning', {
                buttons: {
                    cancel: 'Não tenho certeza',
                    default: 'Sim, tenho certeza'
                }
            }).then((value) => {
                if(value == null){
                    swal('Operação abortada!', 'Sua área de trabalho continua a mesma.', 'info', {
                        button: 'Ok!'
                    });

                    return null;
                } else{
                    let limit = tabelas.length;
                    for(var i = 0; i < limit; i++){
                        tabelas.pop();
                    }
                    
                    return true;
                }
            }).then((value) => {
                if(value == true){
                    refreshMap();
                    sobraGlobalCounter(); // Atualizando sobra
                    localStorage.setItem('tabelas', JSON.stringify(tabelas));
                    console.log('Tabela adicionada ao localStorage');
    
                    swal('Sucesso!', 'A área de trabalho agora está limpa e não possui tabelas!', 'success', {
                        button: 'Ok!'
                    });
                }
            });
        }
    }

    async function addNewTabela(){
        let nome = null;
        let total = null;
        let gasto = null;

        await swal({ // Recebendo nome
            text: 'Digite o nome da Tabela',
            content: 'input',
            icon: 'info'
        }).then((value) => {
            if(value == ''){
                swal('Digite um nome válido!', 'A Tabela precisa de um nome, por favor, tente novamente.', 'error');

                nome = null;
            } else{
                nome = value;
            }
        });
        if(nome != null){
            await swal({ // Recebendo valor teto
                text: 'Digite o valor total (o teto) da Tabela',
                content: 'input',
                icon: 'info'
            }).then((value) => {
                if(value == '' || Number.isNaN(parseFloat(value)) || value <= 0){
                    swal('Digite um valor válido!', 'A Tabela precisa de um teto válido, por favor, tente novamente.', 'error');
    
                    total = null;
                } else{
                    total = parseFloat(value);
                }
            });
        } if(total != null){
            await swal({ // Recebendo valor gasto
                text: 'Digite o valor gasto da Tabela',
                content: 'input',
                icon: 'info'
            }).then((value) => {
                if(value == '' || Number.isNaN(parseFloat(value)) || value < 0){
                    swal('Digite um valor válido!', 'A Tabela precisa de um valor gasto válido, por favor, tente novamente.', 'error');
    
                    return;
                } else if(parseFloat(value) > total){
                    swal('Tabela inválida!', 'O valor gasto da Tabela é maior que o valor total da Tabela.', 'error');
    
                    return;
                } else{
                    gasto = parseFloat(value);
    
                    tabelas.push({ // Fazendo push nas tabelas
                        nome: nome,
                        total: total,
                        gasto: gasto
                    });
            
                    refreshMap(); // Atualizando o map na tela
                    localStorage.setItem('tabelas', JSON.stringify(tabelas));
                    console.log('Tabela adicionada ao localStorage');

                    let a = new Promise(() => {
                        sobraGlobalCounter(); // Atualizando sobra
                    });

                    a.then(() => {
                        if(sobraGlobal >= 0){
                            swal('Tabela criada com sucesso!', `A tabela ${nome} foi criada, agora você possui um total de ${tabelas.length} tabelas!`, 'success');
                        } else {
                            swal('Tabela criada com sucesso, mas cuidado...', `A tabela ${nome} foi criada, porém agora você está no negativo, tem certeza de que está tudo certo?`, 'warning');
                        }
                    })
                }
            });
        }
    }

    async function removeTabela(index){
        await swal('Tem certeza?', 'A ação excluirá a tabela', 'warning', {
            buttons: {
                cancel: 'Cancelar',
                catch: {
                    text: 'Excluir tabela',
                    value: 'submit'
                }
            }
        }).then((value) => {
            switch(value){
                case 'submit':
                    tabelas.splice(index, 1);
                    refreshMap();
                    sobraGlobalCounter(); // Atualizando sobra
                    localStorage.setItem('tabelas', JSON.stringify(tabelas));
                    console.log('Tabela adicionada ao localStorage');
                    swal('Sucesso!', 'Tabela excluida com sucesso!', 'success');
                    break;
                default:
                    swal('Operação cancelada!', 'Operação cancelada com sucesso', 'info');
                    break;
            }
        });
    }

    async function addRemoveTotalGasto(type, fnc, index){
        let value = null;
        
        if(type == 'total'){
            if(fnc == 'add'){
                await swal('Digite quanto você deseja adicionar: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });

                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } else if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                }

                tabelas[index].total += value;
                sobraGlobalCounter();
                console.log(value, 'valor no final');
            } else if(fnc == 'remove'){
                await swal('Digite quanto você deseja diminuir: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });
                
                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                } if(tabelas[index].total - value < 1){
                    swal('ERROR', 'O total não pode ser menor que 1.', 'error');

                    return;
                } if((tabelas[index].total - value) < tabelas[index].gasto){
                    swal('ERROR', 'O total não pode ser menor que o gasto.', 'error');

                    return;
                }

                tabelas[index].total -= value;
                sobraGlobalCounter();
            }
        } else if(type == 'gasto') { // gasto
            if(fnc == 'add'){
                await swal('Digite quanto você deseja adicionar: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });
                
                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                } if(tabelas[index].gasto + value > tabelas[index].total){
                    swal('ERROR', 'O valor gasto não pode ser maior que o valor total.', 'error');

                    return;
                }

                tabelas[index].gasto += value;
            } else if(fnc == 'remove'){
                await swal('Digite quanto você deseja diminuir: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });
                
                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                } if(tabelas[index].gasto - value < 0){
                    swal('ERROR', 'O valor gasto não pode ser menor que 0.', 'error');

                    return;
                }

                tabelas[index].gasto -= value;
            }
        }

        localStorage.setItem('tabelas', JSON.stringify(tabelas));
        console.log('Tabela adicionada ao localStorage');
        refreshMap();
    }

    function toggleHeaderSD(){
        if(document.getElementById('dashboard')){
            let btn = document.getElementById('toggleBtn');
            let header = document.getElementById('dashboardHeader');

            if(header.className == styles.header){
                header.className = styles.headerOn;
            } else if (header.className == styles.headerOn){
                header.className = styles.header;
            }
        }
    }

    // JSON Management
    useEffect(() => {
        async function eraseInitialTabelas(){
            tabelas.splice(0, tabelas.length);
        }

        async function letsGo(){
            if(localStorage.getItem('tabelas') !== null){
                await eraseInitialTabelas().then(() => {
                    // setTabelas(JSON.parse(localStorage.getItem('tabelas')));
                    const a = JSON.parse(localStorage.getItem('tabelas'));

                    for(var i = 0; i < a.length; i++){
                        tabelas.push(a[i]);
                    }
                    
                    if(localStorage.getItem('valorGlobal') !== null){
                        setValorGlobal(JSON.parse(localStorage.getItem('valorGlobal')));
                    }
                }).then(() => {
                    refreshMap();
                    sobraGlobalCounter();
                    console.log(tabelas);
                    console.log(valorGlobal);
                });
            } else {
                console.log('Não existem tabelas');
            }
        }

        letsGo();
    }, []);

    // Use Effects
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
    }, [viewActive]);

    useEffect(() => {
        sobraGlobalCounter();
    }, [valorGlobal]);


    return (
        <MainContext.Provider value={[setViewActive, map, setMap, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD]}>
            <Component {...pageProps} />
        </MainContext.Provider>
    );
}
